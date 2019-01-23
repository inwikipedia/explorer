require( './db.js' )
let mongoose = require( 'mongoose' )
let Transaction = mongoose.model( 'Transaction' )
let AccountInfo = mongoose.model( 'AccountInfo' )
let Web3 = require('web3')
let web3 = new Web3(new Web3.providers.HttpProvider('http://54.169.254.177:40415'))
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
					timestamp: time
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
	let getFromAddr = () => {
		Transaction.find({}).distinct('from').exec((err, result) => {
			if (err) {
				console.log(err)
			} else {
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
	getFromAddr()
}

module.exports.addAccounts = addAccounts