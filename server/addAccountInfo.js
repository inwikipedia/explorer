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
            balance = web3.toBigNumber(balance).toString(10)
            console.log("balance")
            console.log(balance)
						res.balance = balance
						callback(null, res)
					} catch (error) {
						callback(error)
					}
        },
        (res, callback) => {
          if (res.resLen > 0) {
            console.log('update arrress')
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
            console.log('add arresss')
            Transaction.find({ $or: [{"from": result}, {"to": result}] }).sort({"timestamp": 1}).limit(1).exec((err, resTime) => {
              if (err) {
                callback(err)
              } else {
                // console.log("resTime")
                // console.log(resTime)
                let sendData = new AccountInfo({
                  "address": result,
                  "balance": res.balance,
                  "TxCount": res.TxCount,
                  "type": 0,
                  "timestamp": resTime[0].timestamp,
                  "updateTime": resTime[0].timestamp,
                })
                sendData.save((err, insertInfo) => {
                  if (err) {
                    callback(err)
                  } else {
                    callback(null, 'Insert ' + result + ' success')
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
    let params = {}
    if (data.length > 0) {
      timestampInit = Date.parse(new Date()) / 1000
      params = {
        'timestamp': {
          '$gt': data[0].updateTime,
          '$lte': timestampInit
        }
      }
    }
    Transaction.find(params).distinct('from').exec((err, from) => {
      if (err) {
        console.log(err)
      } else {
        let arrPush = new Set()
        for (let i = 0; i < from.length; i++) {
          arrPush.add(from[i])
        }
        Transaction.find(params).distinct('to').exec((error, to) => {
          if (error) {
            console.log(err)
          } else {
            for (let i = 0; i < to.length; i++) {
              arrPush.add(to[i])
            }
            addrLen = arrPush.size
            console.log("Set length:")
            console.log(addrLen)
            cb(null, arrPush)
          }
        })
      }
    })
    // if (data.length <= 0) {
    //   console.log('新')
    //   Transaction.find({}).distinct('from').exec((err, from) => {
    //     if (err) {
    //       console.log(err)
    //     } else {
    //       // if (from.length <= 0) {
    //       //   return
    //       // }
    //       let arrPush = new Set()
    //       for (let i = 0; i < from.length; i++) {
    //         arrPush.add(from[i])
    //       }
    //       Transaction.find({}).distinct('to').exec((error, to) => {
    //         if (error) {
    //           console.log(err)
    //         } else {
    //           for (let i = 0; i < to.length; i++) {
    //             arrPush.add(to[i])
    //           }
    //           addrLen = arrPush.size
    //           console.log("Set length:")
    //           console.log(addrLen)
    //           cb(null, arrPush)
    //         }
    //       })
    //     }
    //   })
    // } else {
		// 	console.log('旧')
    //   timestampInit = Date.parse(new Date()) / 1000
		// 	let params = {
    //     'timestamp': {
    //       '$gt': data[0].updateTime,
    //       // '$lte': timestampInit
    //     }
    //   }
		// 	console.log("params")
    //   console.log(params)
    //   Transaction.find(params).distinct('from').exec((err, from) => {
    //     if (err) {
    //       console.log(err)
    //     } else {
    //       let arrPush = new Set()
    //       for (let i = 0; i < from.length; i++) {
    //         arrPush.add(from[i])
    //       }
    //       Transaction.find({}).distinct('to').exec((error, to) => {
    //         if (error) {
    //           console.log(err)
    //         } else {
    //           for (let i = 0; i < to.length; i++) {
    //             arrPush.add(to[i])
    //           }
    //           addrLen = arrPush.size
    //           console.log("Set length:")
    //           console.log(addrLen)
    //           cb(null, arrPush)
    //         }
    //       })
    //     }
    //   })
      // Transaction.aggregate([
      //   {$match: params }
      // ]).exec((err, result) => {
      //   console.log(err)
      //   console.log(result)
      // })
      // Transaction.find(params).sort({"timestamp": 1}).exec((err, result) => {
      //   console.log('查找地址')
      //   if (err) {
      //     console.log(err)
      //     cb(err)
      //   } else {
      //     console.log('旧地址')
      //     console.log(result)
      //     if (result.length <= 0) {
      //       return
      //     }
			// 		// let arrPush = []
			// 		let arrPush = new Set()
      //     for (let i = 0; i < result.length; i++) {
			// 			if (result[i].from) {
			// 				arrPush.add(result[i].from.toLowerCase())
			// 			}
      //       if (result[i].to) {
			// 				arrPush.add(result[i].to.toLowerCase())
			// 			}
			// 		}
			// 		addrLen = arrPush.size
			// 		console.log("Set length:")
			// 		console.log(addrLen)
			// 		cb(null, arrPush)
      //   }
      // })
    // }
	}
	let getAccountTime = (cb) => {
		AccountInfo.find({}).lean(true).sort({"updateTime": -1}).limit(-1).exec((err, result) => {
			if (err) {
        // console.log(err)
        cb(err)
			} else {
        // console.log(result)
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

// let balance = web3.eth.getBalance('0x31b98d14007bdee637298086988a0bbd31184523')
// balance = web3.toBigNumber(balance).toString(10)
// console.log(balance)
// balance = web3.fromWei(balance, 'ether')
// console.log(balance)
// AccountInfo.update({
//   'address': '0x31b98d14007bdee637298086988a0bbd31184523',
// }, {
//   'balance': balance
// }).exec((err, updateInfo) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(updateInfo)
//     console.log(null, 'Update success:' + '0x31b98d14007bdee637298086988a0bbd31184523')
//   }
// })