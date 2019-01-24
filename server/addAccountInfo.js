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
function addAccounts (socket, req, type) {
	let addrArr = []
	let saveData = (data) => {
		let sendData = new AccountInfo({
			"address": data.address,
			"balance": data.balance,
			"TxCount": data.TxCount,
			"type": data.type,
			"timestamp": data.timestamp
		})
		sendData.save((err, result) => {
			if (err) {
				console.log(err)
			} else {
				// console.log(result)
				console.log('insert' + data.address + 'success')
			}
		})
	}
	let addrTxns = (addr, time) => {		
		Transaction.find({ $or: [{"to": addr}, {"from": addr}] }).countDocuments((err, result) => {
			if (!err) {
				let balance = web3.eth.getBalance(addr)
				balance = web3.fromWei(balance, 'ether')
				// console.log(balance)
				saveData({
					address: addr,
					balance: balance,
					TxCount: result,
					type: 0,
					updateTime: Date.parse(new Date()) / 1000,
					timestamp: time
				})
			} else {
				console.log(err)
			}
		})
	}
	let updateAccount = (addr) => {
		Transaction.find({ $or: [{"to": addr}, {"from": addr}] }).countDocuments((err, result) => {
			if (!err) {
				let balance = web3.eth.getBalance(addr)
				balance = web3.fromWei(balance, 'ether')
				AccountInfo.update({
					'address': addr,
				}, {
					'TxCount': result,
					'balance': balance,
					'updateTime': (Date.parse(new Date()) / 1000)
				}).exec((err, result) => {
					if (err) {
						console.log(err)
					} else {
						console.log(result)
						console.log('Update success')
					}
				})
			} else {
				console.log(err)
			}
		})
	}
	let findAccount = (arr) => {
		for (let i = 0; i < arr.length; i++) {
			// console.log(arr[i])
			if (arr[i].addr === null || arr[i].addr === undefined) continue
			AccountInfo.find({'address': arr[i].addr}).exec((err, result) => {
				if (err) {
					console.log(err)
				} else {
					// console.log(result)
					if (result.length <= 0) {
						addrTxns(arr[i].addr, arr[i].timestamp)
					} else {
						console.log('This address already exists')
						updateAccount(arr[i].addr)
					}
				}
			})
		}
	}
	let getAddrInfo = (addr, num) => {
		Transaction.find({'from': addr}).lean(true).sort({'timestamp': 1}).limit(1).exec((err, result) => {
			if (err) {
				console.log(err)
			} else {
				if (result.length > 0) {
					addrArr.push({
						addr: addr,
						timestamp: result[0].timestamp
					})
					if (addrArr.length === num) {
						findAccount(addrArr)
					}
				}
			}
		})
	}
	let getFromAddr = (time) => {
		let queryData = {}
		if (time) {
			queryData = {
				'timestamp': {
					'$gt': time
				}
			}
		}
		Transaction.find(queryData).distinct('from').exec((err, result) => {
			if (err) {
				console.log(err)
			} else {
				console.log(result)
				if (result.length <= 0) {
					return
				}
				let addrData = []
				for (let i = 0; i < result.length; i++) {
					if (result[i] === null || result[i] === undefined) continue
					if (addrData.indexOf(result[i]) === -1) {
						addrData.push(result[i])
					}
				}
				for (let i = 0; i < addrData.length; i++) {
					getAddrInfo(addrData[i], addrData.length)
				}
			}
		})
	}
	let getAccountTime = () => {
		console.log("account")
		AccountInfo.find({}).lean(true).sort({"updateTime": -1}).limit(1).exec((err, result) => {
			if (err) {
				console.log(err)
			} else {
				if (result.length > 0) {
					getFromAddr(result[0].updateTime)
				} else {
					getFromAddr()
				}
			}
		})
	}
	// getFromAddr()
	getAccountTime()
}
// addAccounts()
module.exports.addAccounts = addAccounts