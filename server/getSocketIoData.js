require( './db.js' )
let mongoose = require( 'mongoose' )
let Block = mongoose.model( 'Block' )
let Transaction = mongoose.model( 'Transaction' )
let Account = mongoose.model( 'Account' )
let AccountInfo = mongoose.model( 'AccountInfo' )

let Web3 = require('web3')
let web3 = new Web3(new Web3.providers.HttpProvider('http://54.169.254.177:40415'))

// router.post('/transaction', (req, res) => {
function transaction(socket, req, type) {
	let setData = {
		pageSize: req.pageSize ? req.pageSize : 20,
		skip: 0
	}
	let data = {
		msg: '',
		info: '',
		total: ''
	}
	type = type ? type : 'transaction'
	setData.skip = req.pageNum ? (Number(req.pageNum - 1) * Number(setData.pageSize)) : 0
	// console.log('setData')
	// console.log(setData)
	let total = () => {		
		Transaction.find({}).countDocuments((err, result) => {
			if (!err) {
				data.msg = 'Success'
				data.total = result
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			info()
		})
	}
	let info = () => {			
		Transaction.find({}).lean(true).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.pageSize)).exec((err, result) => {
			if (!err) {
				data.msg = 'Success'
				data.info = result
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			// socket.emit('transaction', data)
			socket.emit(type, data)
		})
	}
	total()
}

// router.post('/transferDtil', (req, res) => {
function transferDtil(socket, req, type) {
	let setData = {
		hash: req.hash ? req.hash : 0
	}
	let data = {
		msg: '',
		info: ''
	}
	let info = () => {			
		Transaction.find({'hash': setData.hash}).lean(true).exec((err,result) => {
			if (!err) {
				// total()
				data.msg = 'Success'
				data.info = result[0]
				let blockData = web3.eth.getBlock(result[0].blockNumber)
				data.info.gasLimit = blockData.gasLimit
				data.info.gasUsed = blockData.gasUsed
				// console.log(result[0])
// 				console.log(result[0].gasPrice)
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			socket.emit(type, data)
		})
	}
	info()
}

// router.post('/transferPage', (req, res) => {
function transferPage(socket, req, type) {
	let setData = {
		timestamp: req.timestamp ? req.timestamp : 0
	}
	if (req.page === 'next') {
		setData.page = {'$gt': setData.timestamp}
	} else {
		setData.page = {'$lt': setData.timestamp}
	}
	let data = {
		msg: '',
		info: ''
	}
	let info = () => {			
		Transaction.find({'timestamp': setData.page}).lean(true).limit(1).exec((err,result) => {
			if (!err) {
				// total()
				data.msg = 'Success'
				data.info = result[0]
				
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			socket.emit(type, data)
		})
	}
	info()
}

// router.post('/transferAvg', (req, res) => {
function transferAvg(socket, req, type) {
	let dataArr = req.dataArr.length > 0 ? req.dataArr : []
	// console.log('blockAvg:')
	let data = {
		msg: '',
		info: []
	}
	console.log(dataArr)
	let info = (startTime, endTime, num) => {			
		Transaction.find({'timestamp': { '$gt': startTime, '$lte': endTime} }).countDocuments((err, result) => {
			if (!err) {
				data.msg = 'Success'
				data.info.push({timestamp: startTime, data: result})
				if (data.info.length === (dataArr.length - 1) ) {
					let compare = function compare (property) {
						return function (a, b) {
							let value1 = a[property]
							let value2 = b[property]
							if (Date.parse(value1) > Date.parse(value2)) {
								return -1
							} else if (value1 < value2) {
								return 1
							} else {
								return 0
							}
						}
					}
					data.info.sort(compare('timestamp'))
					socket.emit(type, data)
					// total()
				}
			} else {
				data.msg = 'Error'
				data.info = ''
			}
		})
	}
	for (let i = 0; i < dataArr.length; i++) {
		if (i === (dataArr.length - 1) ) break
		let startTime = Date.parse(dataArr[i + 1] + ' ' + '00:00:00') / 1000
		let endTime = Date.parse(dataArr[i] + ' ' + '00:00:00') / 1000
		info(startTime, endTime, i)
	}
}

// router.post('/blocks', (req, res) => {
function blocks(socket, req, type) {
	let setData = {
		pageSize: req.pageSize ? req.pageSize : 20,
		skip: 0
	}
	let data = {
		msg: '',
		info: '',
		total: ''
	}
	setData.skip = req.pageNum ? (Number(req.pageNum - 1) * Number(setData.pageSize)) : 0
	type = type ? type : 'blocks'
	let total = () => {		
		Block.find({}).countDocuments((err, result) => {
			if (!err) {
				data.msg = 'Success'
				data.total = result
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			info()
		})
	}
	let info = () => {			
		Block.find({}).lean(true).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.pageSize)).exec((err,result) => {
			if (!err) {
				// total()
				data.msg = 'Success'
				data.info = result
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			socket.emit(type, data)
		})
	}
	total()
}

// router.post('/pendingBlocks', (req, res) => {
function pendingBlocks(socket, req, type) {
	let setData = {
		pageSize: req.pageSize ? req.pageSize : 20,
		skip: 0
	}
	let data = {
		msg: '',
		info: '',
		total: ''
	}
	setData.skip = req.pageNum ? (Number(req.pageNum - 1) * Number(setData.pageSize)) : 0
	
	let total = () => {		
		Block.find({"hash": ""}).countDocuments((err, result) => {
			if (!err) {
				data.msg = 'Success'
				data.total = result
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			info()
		})
	}
	let info = () => {			
		Block.find({"hash": ""}).lean(true).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.pageSize)).exec((err,result) => {
			if (!err) {
				// total()
				data.msg = 'Success'
				data.info = result
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			socket.emit(type, data)
		})
	}
	total()
}

// router.post('/blockNum', (req, res) => {
function blockNum(socket, req, type) {
	let setData = {
		number: req.number ? req.number : 0
	}
	let data = {
		msg: '',
		info: ''
	}
	let info = () => {			
		Block.find({'number': Number(setData.number)}).lean(true).exec((err, result) => {
			if (!err) {
				// total()
				data.msg = 'Success'
				data.info = result[0]
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			socket.emit(type, data)
		})
	}
	info()
}

// function blockPage(socket, req, type) {
// 	let setData = {
// 		timestamp: req.timestamp ? req.timestamp : 0
// 	}
// 	if (req.page === 'next') {
// 		setData.page = {'$gt': setData.timestamp}
// 	} else {
// 		setData.page = {'$lt': setData.timestamp}
// 	}
// 	let data = {
// 		msg: '',
// 		info: ''
// 	}
// 	console.log('blockPage:')
// 	console.log(setData)
// 	let info = () => {			
// 		Block.find({'timestamp': setData.page}).lean(true).limit(1).exec((err,result) => {
// 			if (!err) {
// 				// total()
// 				data.msg = 'Success'
// 				data.info = result[0]
// 				console.log(data)
// 			} else {
// 				console.log(err)
// 				data.msg = 'Error'
// 				data.info = ''
// 			}
// 			socket.emit(type, data)
// 		})
// 	}
// 	info()
// }

// router.post('/blockAvg', (req, res) => {
function blockAvg(socket, req, type) {
	let dataArr = req.dataArr.length > 0 ? req.dataArr : []
	// console.log('blockAvg:')
	let data = {
		msg: '',
		info: []
	}
	// console.log(dataArr)
	let info = (time, num) => {			
		Block.find({'timestamp': {'$lte': time}}).lean(true).sort({"timestamp": -1}).limit(1).exec((err, result) => {
			if (!err) {
				data.msg = 'Success'
				data.info.push({timestamp: time, data: result[0]})
				if (data.info.length === dataArr.length) {
					let compare = function compare (property) {
						return function (a, b) {
							let value1 = a[property]
							let value2 = b[property]
							if (Date.parse(value1) > Date.parse(value2)) {
								return -1
							} else if (value1 < value2) {
								return 1
							} else {
								return 0
							}
						}
					}
					data.info.sort(compare('timestamp'))
					socket.emit(type, data)
				}
			} else {
				data.msg = 'Error'
				data.info = ''
			}
		})
	}
	for (let i = 0; i < dataArr.length; i++) {
		let dateTime = Date.parse(dataArr[i] + ' ' + '00:00:00') / 1000
		info(dateTime, i)
	}
}

// router.get('/blockTime', (req, res) => {
function blockTime(socket, req, type) {
	let nowTime = Date.parse(new Date())
	let data = {
		msg: '',
		info: ''
	}
	let info = () => {			
		Block.find({'timestamp': {'$lte': nowTime}}).lean(true).sort({"timestamp": -1}).limit(2).exec((err, result) => {
			if (!err) {
				// total()
				data.msg = 'Success'
				data.info = result[0].timestamp - result[1].timestamp
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			socket.emit(type, data)
		})
	}
	info()
}


// router.post('/topAccounts', (req, res) => {
function topAccounts(socket, req, type) {
	let setData = {
		pageSize: req.pageSize ? req.pageSize : 20,
		skip: 0
	}
	let data = {
		msg: '',
		info: '',
		total: ''
	}
	setData.skip = req.pageNum ? (Number(req.pageNum - 1) * Number(setData.pageSize)) : 0
	
	let total = () => {		
		Account.find({}).countDocuments((err, result) => {
			if (!err) {
				data.msg = 'Success'
				data.total = result
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			info()
		})
	}
	let info = () => {			
		Account.find({}).lean(true).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.pageSize)).exec((err,result) => {
			if (!err) {
				// total()
				data.msg = 'Success'
				data.info = result
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			console.log(data)
			socket.emit(type, data) 
		})
	}
	total()
}

function getAccounts (socket, req, type) {
	let setData = {
		pageSize: req.pageSize ? req.pageSize : 20,
		skip: 0,
		balance: req.balance ? req.balance : 20
	}
	let data = {
		msg: '',
		info: '',
		total: ''
	}
	setData.skip = req.pageNum ? (Number(req.pageNum - 1) * Number(setData.pageSize)) : 0
	
	let total = () => {		
		AccountInfo.find({'balance': {'$gt': setData.balance}}).countDocuments((err, result) => {
			if (!err) {
				data.msg = 'Success'
				data.total = result
				// console.log(result)
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			info()
		})
	}
	let info = () => {			
		AccountInfo.find({'balance': {'$gt': setData.balance}}).lean(true).sort({"balance": -1}).skip(setData.skip).limit(Number(req.pageSize)).exec((err,result) => {
			if (!err) {
				// total()
				data.msg = 'Success'
				data.info = result
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			socket.emit(type, data)
		})
	}
	total()
}

// router.post('/accountTxn', (req, res) => {
function accountTxn(socket, req, type) {
	let setData = {
		pageSize: req.pageSize ? req.pageSize : 20,
		skip: 0,
		addr: req.addr
	}
	let data = {
		msg: '',
		info: '',
		total: ''
	}
	setData.skip = req.pageNum ? (Number(req.pageNum - 1) * Number(setData.pageSize)) : 0
	
	let total = () => {		
		Transaction.find({ $or: [{"to": setData.addr}, {"from": setData.addr}] }).countDocuments((err, result) => {
			if (!err) {
				data.msg = 'Success'
				data.total = result
				// console.log(result)
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			info()
		})
	}
	let info = () => {			
		Transaction.find({ $or: [{"to": setData.addr}, {"from": setData.addr}] }).lean(true).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.pageSize)).exec((err,result) => {
			if (!err) {
				// total()
				data.msg = 'Success'
				data.info = result
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			socket.emit(type, data)
		})
	}
	total()
}

function accountDtil (socket, req) {
	let setData = req && req.address ? req.address : ''
	let data = {
		msg: '',
		info: ''
	}
	console.log('accountDtil')
	console.log(setData)
	let updateAccount = (TxCount) => {
		AccountInfo.update({'address': setData}, {'TxCount': TxCount}).exec((err, result) => {
			if (err) {
				console.log(err)
			} else {
				console.log(result)
			}
		})
	}
	let total = (TxCount) => {		
		Transaction.find({ $or: [{"to": setData}, {"from": setData}] }).countDocuments((err, result) => {
			if (!err) {
				data.msg = 'Success'
				if (TxCount !== result) {
					data.info.TxCount = result
					updateAccount(result)
				}
				// console.log(result)
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			socket.emit('accountDtil', data)
		})
	}
	AccountInfo.find({'address': setData}).exec((err, result) => {
		if (err) {
			console.log(err)
		} else {
// 			console.log(result)
// 			console.log(result.length)
			if (result.length <= 0) {
				// console.log(1)
				data.msg = 'Null'
				data.info = ''
				socket.emit('accountDtil', data)
			} else {
				// console.log(2)
				data.msg = 'Success'
				data.info = result[0]
				total(result[0].TxCount)
			}
		}
	})
// 	web3.eth.getBalance(setData, (err, result) => {
// 		if (!err) {
// 			data.msg = 'Success'
// 			data.fsnBalance = result
// 		} else {
// 			data.msg = 'Error'
// 			data.fsnBalance = ''
// 		}
// 		total()
// 	})
}


function sendData (socket) {
	let newBlocks = web3.eth.filter('latest')
	socket.on('transaction', (req) => {
		console.log(req)
		transaction(socket, req, 'transaction')
	})
	socket.on('transactionRefresh', (req) => {
		transaction(socket, req, 'transactionRefresh')
		newBlocks.watch(function (error,latestBlock) {
			if (error) {
				console.log(error)
			} else {
				transaction(socket, req, 'transactionRefresh')
			}
		})
	})
	socket.on('transferDtil', (req) => {
		transferDtil(socket, req, 'transferDtil')
	})
	socket.on('transferPage', (req) => {
		transferPage(socket, req, 'transferPage')
	})
	socket.on('transferAvg', (req) => {
		transferAvg(socket, req, 'transferAvg')
	})
	socket.on('blocks', (req) => {
		console.log(req)
		blocks(socket, req, 'blocks')
	})
	socket.on('blocksRefresh', (req) => {
		console.log('blocksRefresh')
		blocks(socket, req, 'blocksRefresh')
		newBlocks.watch(function (error,latestBlock) {
			if (error) {
				console.log(error)
			} else {
				blocks(socket, req, 'blocksRefresh')
			}
		})
	})
	socket.on('pendingBlocks', (req) => {
		pendingBlocks(socket, req, 'pendingBlocks')
	})
	socket.on('blockNum', (req) => {
		blockNum(socket, req, 'blockNum')
	})
// 	socket.on('blockPage', (req) => {
// 		blockPage(socket, req, 'blockPage')
// 	})
	socket.on('blockAvg', (req) => {
		blockAvg(socket, req, 'blockAvg')
	})
	socket.on('blockTime', (req) => {
		blockTime(socket, req, 'blockTime')
	})
	socket.on('topAccounts', (req) => {
		topAccounts(socket, req, 'topAccounts')
	})
	socket.on('getAccounts', (req) => {
		getAccounts(socket, req, 'getAccounts')
	})
	socket.on('accountTxn', (req) => {
		accountTxn(socket, req, 'accountTxn')
	})
	socket.on('accountDtil', (req) => {
		accountDtil(socket, req, 'accountDtil')
	})
}

// module.exports.transaction = transaction
// module.exports.transferDtil = transferDtil
// module.exports.transferPage = transferPage
// module.exports.transferAvg = transferAvg
// module.exports.blocks = blocks
// module.exports.pendingBlocks = pendingBlocks
// module.exports.blockNum = blockNum
// module.exports.blockAvg = blockAvg
// module.exports.blockTime = blockTime
// module.exports.topAccounts = topAccounts
// module.exports.accountTxn = accountTxn
module.exports.sendData = sendData