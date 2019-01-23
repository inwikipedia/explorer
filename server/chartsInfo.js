require( './db.js' )
let mongoose = require( 'mongoose' )
let Transaction = mongoose.model( 'Transaction' )
let AccountInfo = mongoose.model( 'AccountInfo' )
let TransactionChart = mongoose.model( 'TransactionChart' )
let Block = mongoose.model( 'Block' )

function getBeforeDate(n) {
	// let n = n
	let s
	let d = new Date()
	let year = d.getFullYear()
	let mon = d.getMonth() + 1
	let day = d.getDate()
	if(day <= n) {
		if(mon > 1) {
			mon = mon - 1;
		} else {
			year = year - 1
			mon = 12
		}
	}
	d.setDate(d.getDate() - n)
	year = d.getFullYear()
	mon = d.getMonth() + 1
	day = d.getDate()
	s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day)
	return s
}

function findChartTime () {
	TransactionChart.find({}).lean(true).sort({"timestamp": -1}).limit(1).exec((error, result) => {
		if (error) {
			console.log('findChartTime')
			console.log(error)
		} else {
			if (result.length <= 0) {
				findTransactionTime(0)
			} else {
// 				console.log('findChartTime')
// 				console.log(result)
				findTransactionTime(result[0].timestamp)
			}
		}
	})
}

function findTransactionTime (time) {
	Transaction.find({'timestamp': { '$gt': time} }).lean(true).sort({"timestamp": 1}).limit(1).exec((error, result) => {
		if (error) {
			console.log('findTransactionTime')
			console.log(error)
		} else {
			if (result.length > 0) {
				findBlockTime(result[0].timestamp)
			} else {
				console.log('no new data')
			}
		}
	})
}

function findBlockTime (time) {
	Block.find({'timestamp': { '$gt': 0} }).lean(true).sort({"timestamp": 1}).limit(1).exec((error, result) => {
		if (error) {
			console.log('findBlockTime')
			console.log(error)
		} else {
			let timestamp
			if (time > result[0].timestamp) {
				timestamp = result[0].timestamp
			} else {
				timestamp = time
			}
			setTimeInterval(timestamp)
		}
	})
}

function setTimeInterval (time) {
	let nowTime = Date.parse(new Date())
	time = time.toString().length > 10 ? time : time * 1000
	let timeInterval = Math.floor((nowTime - time) / (1000 * 60 * 60 * 24))
	let dateArr = []
	for (let i = 0; i < timeInterval; i++) {
		let dateTime = Date.parse(getBeforeDate(timeInterval - i))
		dateTime = dateTime.toString().length > 10 ? (dateTime / 1000) : dateTime,
		getTransactionData(dateTime, getBeforeDate(timeInterval - i))
	}
	console.log(dateArr)
}

function getTransactionData(time, date) {
	let endTime = time + (60 * 60 * 24)
	let totalCount = () => {
		Transaction.find({'timestamp': { '$gt': time, '$lte': endTime} }).countDocuments((error, result) => {
			if (error) {
				console.log('getTransactionData5')
				console.log(error)
			} else {
				getBlockData(time, result)
			}
		})
	}
	totalCount()
}

function getBlockData(time, txns) {
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
	let intervalData = () => {
		Block.find({'timestamp': { '$gt': time, '$lt': endTime}}).lean(true).sort({"timestamp": 1}).exec((error, result) => {
			if (error) {
				console.log('getBlockData1')
				console.log(error)
			} else {
				// console.log('getBlockData2')
				if (result.length > 0) {
					let startTimeRes = result[0].timestamp
					let endTimeRes = result[result.length - 1].timestamp
					dataObj.blockCount = result[result.length - 1].number - result[0].number
					for (let i = 0; i < result.length; i++) {
						result[i].difficulty = result[i].difficulty ? result[i].difficulty : 0
						result[i].size = result[i].size ? result[i].size : 0,
						dataObj.difficulty += Number(result[i].difficulty)
						dataObj.size += Number(result[i].size)
						dataObj.uncles += Number(result[i].uncles.length)
					}
					dataObj.blockTime = dataObj.blockCount === 0 ? 0 : (endTimeRes - startTimeRes) / dataObj.blockCount
					dataObj.difficulty = dataObj.blockCount === 0 ? 0 : dataObj.difficulty / dataObj.blockCount
					dataObj.size = dataObj.blockCount === 0 ? 0 : dataObj.size / dataObj.blockCount
					dataObj.uncles = dataObj.blockCount === 0 ? 0 : dataObj.uncles / dataObj.blockCount
				}
				// console.log(dataObj)
				getAccountData(dataObj)
				// totalCount()
				// startData()
			}
		})
	}
	intervalData()
}

function getAccountData (data) {
	let endTime = data.timestamp + (60 * 60 * 24)
	let intervalData = () => {
		AccountInfo.find({'timestamp': { '$gt': data.timestamp, '$lt': endTime}}).countDocuments((error, result) => {
			if (error) {
				console.log('getBlockData1')
				console.log(error)
			} else {
				data.addressCount = result
				insertCharts(data)
			}
		})
	}
	let accountData = () => {
		AccountInfo.find({'timestamp': {'$lt': endTime}}).countDocuments((error, result) => {
			if (error) {
				console.log('getBlockData1')
				console.log(error)
			} else {
				data.addressNum = result
				intervalData()
			}
		})
	}
	accountData()
}

function insertCharts (data) {
	let transactionChart = new TransactionChart({
	    "timestamp": data.timestamp,
	    "difficultyAvg": data.difficulty,
	    "blockTimeAvg": data.blockTime,
	    "blockSizeAvg": data.size,
	    "blockCount": data.blockCount,
	    "addressCount": data.addressCount,
	    "addressNum": data.addressNum,
	    "txnCount": data.txnCount,
			"EstHashRate": '',
			"unclesCount": data.uncles
	})
	transactionChart.save((err, result) => {
		if (err) {
			console.log(err)
		} else {
			console.log('insert transaction charts success')
		}
	})
}

// findChartTime()
module.exports.findChartTime = findChartTime