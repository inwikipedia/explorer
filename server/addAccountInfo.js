var async = require('async')

require( './db.js' )
let mongoose = require( 'mongoose' )
let Transaction = mongoose.model( 'Transaction' )
let AccountInfo = mongoose.model( 'AccountInfo' )
var _ = require('lodash');
var config = { nodeAddr: 'localhost', gethPort: 8545, bulkSize: 100 };
try {
	var local = require('./config.json');
	_.extend(config, local);
	console.log('config.json found.');
} catch (error) {
	if (error.code === 'MODULE_NOT_FOUND') {
			var local = require('./config.example.json');
			_.extend(config, local);
			console.log('No config file found. Using default configuration... (config.example.json)');
	} else {
			throw error;
			process.exit(1);
	}
}

let Web3 = require('web3')
let web3 = new Web3(new Web3.providers.HttpProvider('http://' + config.nodeAddr + ':' + config.gethPort.toString()))

var countAdd = 0
var addrLen = 0
// var balanceArr = []
function addAccounts (timestampInit) {
  let syncAccount = (results) => {
    async.eachSeries(results, (result, cb) => {
      async.waterfall([
        (callback) => {
          console.log("waterfall")
          console.log(result)
          AccountInfo.find({'address': result}).exec((err, addrdata) => {
            if (err) {
              callback(err)
            } else {
							// console.log("addrdata")
							// console.log(addrdata)
              callback(null, addrdata)
            }
          })
        },
        (res, callback) => {
          Transaction.find({ $or: [{"to": result}, {"from": result}] }).countDocuments((err, TxCount) => {
            if (!err) {
              callback(null, {
                TxCount: TxCount,
                resLen: res.length
              })
            } else {
              callback(err)
            }
          })
        },
        (res, callback) => {
					let balance
					try {
						balance = web3.eth.getBalance(result)
						balance = web3.fromWei(balance, 'ether')
						res.balance = balance
						callback(null, res)
					} catch (error) {
						callback(error)
					}
        },
        (res, callback) => {
          if (res.resLen > 0) {
            AccountInfo.update({
              'address': result,
            }, {
              'TxCount': res.TxCount,
              'balance': res.balance,
              'updateTime': (Date.parse(new Date()) / 1000)
            }).exec((err, updateInfo) => {
              if (err) {
                callback(err)
              } else {
                callback(null, 'Update success:' + result)
              }
            })
          } else {
            Transaction.find({"address": result}).sort({"timestamp": 1}).limit(1).exec((err, resTime) => {
              if (err) {
                callback(err)
              } else {
                console.log(resTime)
                if (resTime.length <= 0) {
                  callback(err)
                  return
                }
                let sendData = new AccountInfo({
                  "address": result,
                  "balance": res.balance,
                  "TxCount": res.TxCount,
                  "type": 0,
                  "timestamp": resTime[0].timestamp,
                  "updateTime": Date.parse(new Date()) / 1000,
                })
                sendData.save((err, insertInfo) => {
                  if (err) {
                    callback(err)
                  } else {
                    callback(null, 'insert' + result + 'success')
                  }
                })
              }
            })
          }
        }
      ], (err, res) => {
				countAdd ++
				console.log("countAdd")
				console.log(countAdd)
				console.log("result")
				console.log(err)
				console.log(res)
				cb(null)
				
      })
    }, (err, res) => {
      console.log("----------------Update End---------------------")
      console.log(err)
			console.log(res)
			countAdd = 0
			addrLen = 0
    })
  }
	let getFromAddr = (data, cb) => {
    if (data.length <= 0) {
      console.log('新')
      Transaction.find({}).distinct('from').exec((err, result) => {
        if (err) {
          console.log(err)
        } else {
          if (result.length <= 0) {
            return
          }
          cb(result)
        }
      })
    } else {
			console.log('旧')
			let params = {
        'timestamp': {
          '$gt': (Date.parse(new Date()) / 1000) - 15
        }
			}
			timestampInit = Date.parse(new Date()) / 1000
			if (timestampInit) {
				params = {
					'timestamp': {
						'$gt': data[0].updateTime,
						'$lte': timestampInit
					}
				}
			}
			console.log("params")
			console.log(params)
      Transaction.find(params).sort({"timestamp": 1}).exec((err, result) => {
        if (err) {
          console.log(err)
        } else {
          if (result.length <= 0) {
            return
          }
					// let arrPush = []
					let arrPush = new Set()
          for (let i = 0; i < result.length; i++) {
						if (result[i].from) {
							arrPush.add(result[i].from.toLowerCase())
						}
					}
					addrLen = arrPush.size
					console.log("Set length:")
					console.log(addrLen)
					cb(null, arrPush)
        }
      })
    }
	}
	let getAccountTime = (cb) => {
		AccountInfo.find({}).lean(true).sort({"updateTime": -1}).limit(1).exec((err, result) => {
			if (err) {
				console.log(err)
			} else {
        cb(null, result)
			}
    })
    
	}
	// getFromAddr()
	async.waterfall([
    getAccountTime,
    getFromAddr,
    syncAccount
  ], (err, res) => {
    console.log(err)
    console.log(res)
  })
}
// let stateCount = 0
function initMethod (){
	console.log("initMethod")
	console.log(addrLen)
	console.log(countAdd)
	if (addrLen === countAdd) {
		setTimeout(addAccounts, 100)
	}
	setTimeout(initMethod, 10000)
}
initMethod()


