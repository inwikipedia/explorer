var async = require('async')
require('./db.js')
let mongoose = require('mongoose')
let Transaction = mongoose.model('Transaction')
// let AccountInfo = mongoose.model('AccountInfo')
let TransactionChart = mongoose.model('TransactionChart')
let Block = mongoose.model('Block')

function getBeforeDate (n) {
	// let n = n
	let s
	let d = new Date()
	let year = d.getFullYear()
	let mon = d.getMonth() + 1
	let day = d.getDate()
	if (day <= n) {
		if (mon > 1) {
			mon = mon - 1
		} else {
			year = year - 1
			mon = 12
		}
	}
	d.setDate(d.getDate() - n)
	year = d.getFullYear()
	mon = d.getMonth() + 1
	day = d.getDate()
	s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day)
	return s
}


let syncChart = function () {
  async.waterfall([
    (callback) => {
      TransactionChart.find({}).lean(true).sort({'timestamp': -1}).limit(1).exec((err, res) => {
        if (err) {
          callback(err)
        } else {
          if (res.length <= 0) {
            callback(null, 0)
          } else {
            callback(null, res[0].timestamp)
          }
        }
      })
    },
    (time, callback) => {
      let nowTime = Date.parse(new Date()) / 1000
      time = time.toString().length > 10 ? (time / 1000) : time
      let timeInterval = Math.floor((nowTime - time) / (60 * 60 * 24))
      let dateArr = []
      for (let i = 1; i < timeInterval; i++) {
        let beforeDays = timeInterval - i
        dateArr.push(getBeforeDate(beforeDays))
      }
      getTransactionData(dateArr)
      callback(null)
    }
  ], (err, res) => {
    console.log("syncChart")
    console.log(err)
    console.log(res)
  })

}
function getTransactionData(results) {
  async.eachSeries(results, (result, cb) => {
    console.log("getTransactionData")
    console.log(result)
    // return
    async.waterfall([
      (callback) => {
        let time = Date.parse(result) / 1000
        let endTime = time + (60 * 60 * 24)
        Transaction.find({'timestamp': {'$gt': time, '$lte': endTime}}).countDocuments((err, res) => {
          if (err) {
            callback(err)
          } else {
            callback(null, time, res)
          }
        })
      },
      (time, txns, callback) => {
        let endTime = time + (60 * 60 * 24)
        let dataObj = {
          timestamp: time,
          txnCount: txns,
          difficulty: 0,
          blockCount: 0,
          blockTime: 0,
          size: 0,
          uncles: 0
        }
        Block.find({'timestamp': {'$gt': time, '$lt': endTime}}).lean(true).sort({'timestamp': 1}).exec((err, res) => {
          if (err) {
            callback(err)
          } else {
            if (res.length > 0) {
              let startTimeRes = res[0].timestamp
              let endTimeRes = res[res.length - 1].timestamp
              dataObj.blockCount = res[res.length - 1].number - res[0].number
              for (let i = 0; i < res.length; i++) {
                res[i].difficulty = res[i].difficulty ? res[i].difficulty : 0
                res[i].size = res[i].size ? res[i].size : 0
                dataObj.difficulty += Number(res[i].difficulty)
                dataObj.size += Number(res[i].size)
                dataObj.uncles += Number(res[i].uncles.length)
              }
              dataObj.blockTime = dataObj.blockCount === 0 ? 0 : (endTimeRes - startTimeRes) / dataObj.blockCount
              dataObj.difficulty = dataObj.blockCount === 0 ? 0 : dataObj.difficulty / dataObj.blockCount
              dataObj.size = dataObj.blockCount === 0 ? 0 : dataObj.size / dataObj.blockCount
              dataObj.uncles = dataObj.blockCount === 0 ? 0 : dataObj.uncles / dataObj.blockCount
            }
            callback(null, dataObj)
          }
        })
      },
      (res, callback) => {
        let endTime = res.timestamp + (60 * 60 * 24)
        Transaction.find({'timestamp': {'$lt': endTime}}).distinct('from').exec((err, resForm) => {
          if (err) {
            callback(err)
          } else {
            let addrData = []
            for (let i = 0; i < resForm.length; i++) {
              if (resForm[i] === null || resForm[i] === undefined) continue
              if (addrData.indexOf(resForm[i]) === -1) {
                addrData.push(resForm[i])
              }
            }
            res.addressNum = addrData.length
            callback(null, res)
          }
        })
      },
      (res, callback) => {
        let endTime = res.timestamp + (60 * 60 * 24)
        Transaction.find({'timestamp': {'$gt': res.timestamp, '$lt': endTime}}).distinct('from').exec((err, resForm) => {
          if (err) {
            callback(err)
          } else {
            let addrData = []
            for (let i = 0; i < resForm.length; i++) {
              if (resForm[i] === null || resForm[i] === undefined) continue
              if (addrData.indexOf(resForm[i]) === -1) {
                addrData.push(resForm[i])
              }
            }
            res.addressCount = addrData.length
            callback(null, res)
          }
        })
      },
      (data, callback) => {
        let transactionChart = new TransactionChart({
          'timestamp': data.timestamp,
          'difficultyAvg': data.difficulty,
          'blockTimeAvg': data.blockTime,
          'blockSizeAvg': data.size,
          'blockCount': data.blockCount,
          'addressCount': data.addressCount,
          'addressNum': data.addressNum,
          'txnCount': data.txnCount,
          'EstHashRate': '',
          'unclesCount': data.uncles
        })
        transactionChart.save((err, res) => {
          if (err) {
            callback(err)
          } else {
            console.log('insert transaction charts success')
            callback('insert transaction charts success')
          }
        })
        cb(null)
      }
    ], (err, res) => {

    })
  }, (err, res) => {

  })
}

function initMethod (){
	if ((new Date()).getHours() === 0 || (new Date()).getHours() === 12) {
		setTimeout(syncChart, 100)
	}
	setTimeout(initMethod, 1500)
}
initMethod()
syncChart()