require( './db.js' )
let mongoose = require( 'mongoose' )
let Block = mongoose.model( 'Block' )
let Transaction = mongoose.model( 'Transaction' )
let Account = mongoose.model( 'Account' )
let AccountInfo = mongoose.model( 'AccountInfo' )

let async = require('async')

let Web3 = require('web3')
// let web3 = new Web3(new Web3.providers.HttpProvider('http://54.169.254.177:40415'))
let web3 = new Web3(new Web3.providers.HttpProvider('https://api.nodes.run'))

// router.post('/transaction', (req, res) => {
function transaction(socket, req, type) {
// const transaction = (socket, req, type) => {
	let setData = {
		pageSize: req && req.pageSize ? req.pageSize : 20,
		skip: 0
	}
	let data = {
		msg: '',
		info: '',
		total: ''
	}
	type = type ? type : 'transaction'
	setData.skip = req && req.pageNum ? (Number(req.pageNum - 1) * Number(setData.pageSize)) : 0

	async.waterfall([
		(cb) => {
			Transaction.find({}).countDocuments((err, result) => {
				if (!err) {
					data.msg = 'Success'
					data.total = result
					cb(null, data)
				} else {
					data.msg = 'Error'
					data.info = ''
					cb(data)
				}
			})
		},
		(data, cb) => {
			Transaction.find({}).lean(true).sort({"timestamp": -1}).skip(setData.skip).limit(Number(setData.pageSize)).exec((err, result) => {
				if (!err) {
					data.msg = 'Success'
					data.info = result
					cb(null, data)
				} else {
					data.msg = 'Error'
					data.info = ''
					cb(data)
				}
			})
		}
	], (err, data) => {
		if (err) {
			socket.emit(type, err)
		} else {
			socket.emit(type, data)
		}
		console.log('transaction: ' + (Date.parse(new Date()) / 1000))
		// socket.emit(type, data)
		console.log('transaction callback data success')
	})
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
	console.log(setData)		
	Transaction.find({'hash': setData.hash}).lean(true).exec((err,result) => {
		if (!err) {
			data.msg = 'Success'
			if (result.length <= 0) {
				data.info = []
			} else {
				data.info = result[0]
				let blockData = web3.eth.getBlock(result[0].blockNumber)
				data.info.gasLimit = blockData.gasLimit
				data.info.gasUsed = blockData.gasUsed
			}
		} else {
			data.msg = 'Error'
			data.info = ''
		}
		socket.emit(type, data)
		console.log('transferDtil callback data success')
	})
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
	Transaction.find({'timestamp': setData.page}).lean(true).limit(1).exec((err,result) => {
		if (!err) {
			data.msg = 'Success'
			data.info = result[0]
			
		} else {
			data.msg = 'Error'
			data.info = ''
		}
		socket.emit(type, data)
		console.log('transferPage callback data success')
	})
}

// router.post('/blocks', (req, res) => {
function blocks(socket, req, type) {
	let setData = {
		pageSize: req && req.pageSize ? req.pageSize : 20,
		skip: 0
	}
	let data = {
		msg: '',
		info: '',
		total: ''
	}
	setData.skip = req && req.pageNum ? (Number(req.pageNum - 1) * Number(setData.pageSize)) : 0
	type = type ? type : 'blocks'

	async.waterfall([
		(cb) => {
			Block.find({}).countDocuments((err, result) => {
				if (!err) {
					data.msg = 'Success'
					data.total = result
					cb(null, data)
				} else {
					data.msg = 'Error'
					data.info = ''
					cb(data)
				}
				// info()
			})
		},
		(data, cb) => {
			Block.find({}).lean(true).sort({"timestamp": -1}).skip(setData.skip).limit(Number(setData.pageSize)).exec((err,result) => {
				if (!err) {
					// total()
					data.msg = 'Success'
					data.info = result
					cb(null, data)
				} else {
					data.msg = 'Error'
					data.info = ''
					cb(data)
				}
			})
		}
	], (err, data) => {
		if (err) {
			socket.emit(type, err)
		} else {
			socket.emit(type, data)
		}
		// socket.emit(type, data)
		console.log('blocks callback data success')
	})
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

	async.waterfall([
		(cb) => {
			Block.find({"hash": ""}).countDocuments((err, result) => {
				if (!err) {
					data.msg = 'Success'
					data.total = result
					cb(null, data)
				} else {
					data.msg = 'Error'
					data.info = ''
					cb(data)
				}
				// info()
			})
		},
		(data, cb) => {
			Block.find({"hash": ""}).lean(true).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.pageSize)).exec((err,result) => {
				if (!err) {
					// total()
					data.msg = 'Success'
					data.info = result
					cb(null, data)
				} else {
					data.msg = 'Error'
					data.info = ''
					cb(data)
				}
			})
		}
	], (err, data) => {
		if (err) {
			socket.emit(type, err)
		} else {
			socket.emit(type, data)
		}
		// socket.emit(type, data)
		console.log('pendingBlocks callback data success')
	})

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
		console.log('blockNum callback data success')
	})
}
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
// router.post('/blockAvg', (req, res) => {
function getAvgData(socket, req, type) {
	let dataArr = req.dataArr.length > 0 ? req.dataArr : []
	let data = {
		msg: '',
		blockTime: '',
		trans: [],
		blocks: []
	}
	let getAvg = (startTime, endTime) => {
		let nowTime = Date.parse(new Date())
		async.waterfall([
			(cb) => {
				Block.find({'timestamp': {'$lte': endTime}}).lean(true).sort({"timestamp": -1}).limit(1).exec((err, result) => {
					if (!err) {
						data.msg = 'Success'
						data.blocks.push({timestamp: endTime, data: result[0]})
						cb(null, data)
					} else {
						data.msg = 'Error'
						data.blocks = []
						cb(data)
					}
				})
			},
			(data, cb) => {
				if (data && data.blocks && (data.blocks.length === (dataArr.length - 1)) ) {
					Block.find({'timestamp': {'$lte': nowTime}}).lean(true).sort({"timestamp": -1}).limit(2).exec((err, result) => {
						if (!err) {
							// total()
							data.msg = 'Success'
							data.blockTime = result[0].timestamp - result[1].timestamp
							cb(null, data)
						} else {
							data.msg = 'Error'
							data.blockTime = ''
							cb(data)
						}
					})
				} else {
					cb(null, data)
				}
			},
			(data, cb) => {
				if (isNaN(startTime)) {
					cb(null, data)
					return
				}
				Transaction.find({'timestamp': { '$gt': startTime, '$lte': endTime} }).countDocuments((err, result) => {
					if (!err) {
						data.msg = 'Success'
						data.trans.push({timestamp: startTime, data: result})
						cb(null, data)
					} else {
						data.msg = 'Error'
						data.trans = []
						cb(data)
					}
				})
			}
		], (err, data) => {
			if (err) {
				socket.emit(type, data)
			} else {
				if (data && data.trans && (data.trans.length === (dataArr.length - 1)) ) {
					data.trans.sort(compare('timestamp'))
					data.blocks.sort(compare('timestamp'))
					socket.emit(type, data)
				}
			}
		})
	}
	for (let i = 0; i < dataArr.length; i++) {
		let startTime = Date.parse(dataArr[i + 1] + ' ' + '00:00:00') / 1000
		let endTime = Date.parse(dataArr[i] + ' ' + '00:00:00') / 1000
		getAvg(startTime, endTime)
	}
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

	async.waterfall([
		(cb) => {
			Account.find({}).countDocuments((err, result) => {
				if (!err) {
					data.msg = 'Success'
					data.total = result
					cb(null, data)
				} else {
					data.msg = 'Error'
					data.info = ''
					cb(data)
				}
			})
		},
		(data, cb) => {
			Account.find({}).lean(true).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.pageSize)).exec((err,result) => {
				if (!err) {
					data.msg = 'Success'
					data.info = result
					cb(null, data)
				} else {
					data.msg = 'Error'
					data.info = ''
					cb(data)
				}
			})
		}
	], (err, data) => {
		if (err) {
			socket.emit(type, err)
		} else {
			socket.emit(type, data)
		}
		console.log('topAccounts callback data success')
	})
}

function getAccounts (socket, req, type) {
	let setData = {
		pageSize: req.pageSize ? req.pageSize : 20,
		skip: 0,
		balance: req.balance || req.balance === 0 ? req.balance : 20
	}
	let data = {
		msg: '',
		info: '',
		total: ''
	}
	setData.skip = req.pageNum ? (Number(req.pageNum - 1) * Number(setData.pageSize)) : 0
	console.log(setData)	

	async.waterfall([
		(cb) => {
			AccountInfo.find({'balance': {'$gte': setData.balance}}).lean(true).sort({"balance": -1}).countDocuments((err, result) => {
			// AccountInfo.find({}).lean(true).sort({"balance": -1}).countDocuments((err, result) => {
				if (!err) {
					data.msg = 'Success'
					data.total = result
					cb(null, data)
				} else {
					data.msg = 'Error'
					data.info = ''
					cb(data)
				}
			})
		},
		(data, cb) => {
			AccountInfo.find({'balance': {'$gte': setData.balance}}).lean(true).sort({"balance": -1}).skip(setData.skip).limit(Number(req.pageSize)).exec((err,result) => {
			// AccountInfo.find({}).lean(true).sort({"balance": -1}).skip(setData.skip).limit(Number(req.pageSize)).exec((err,result) => {
				if (!err) {
					data.msg = 'Success'
					data.info = result
					cb(null, data)
				} else {
					data.msg = 'Error'
					data.info = ''
					cb(data)
				}
			})
		}
	], (err, data) => {
		if (err) {
			socket.emit(type, err)
		} else {
			socket.emit(type, data)
		}
		// socket.emit(type, data)
		console.log('getAccounts callback data success')
	})

}

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

	async.waterfall([
		(cb) => {
			Transaction.find({ $or: [{"to": setData.addr}, {"from": setData.addr}] }).countDocuments((err, result) => {
				if (!err) {
					data.msg = 'Success'
					data.total = result
					cb(null, data)
				} else {
					data.msg = 'Error'
					data.info = ''
					cb(data)
				}
			})
		},
		(data, cb) => {
			Transaction.find({ $or: [{"to": setData.addr}, {"from": setData.addr}] }).lean(true).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.pageSize)).exec((err,result) => {
				if (!err) {
					data.msg = 'Success'
					data.info = result
					cb(null, data)
				} else {
					data.msg = 'Error'
					data.info = ''
					cb(data)
				}
			})
		}
	], (err, data) => {
		if (err) {
			socket.emit(type, err)
		} else {
			socket.emit(type, data)
		}
		// socket.emit(type, data)
		console.log('accountTxn callback data success')
	})
}

function accountDtil (socket, req) {
	let setData = req && req.address ? req.address : ''
	let data = {
		msg: '',
		info: ''
	}

	async.waterfall([
		(cb) => {
			AccountInfo.find({'address': setData}).exec((err, result) => {
				if (err) {
					console.log(err)
					data.msg = 'Error'
					data.info = ''
					cb(data)
				} else {
					if (result.length <= 0) {
						data.msg = 'Null'
						data.info = ''
						cb(data)
					} else {
						data.msg = 'Success'
						data.info = result[0]
						cb(null, data)
					}
				}
			})
		},
		(data, cb) => {
			Transaction.find({ $or: [{"to": setData}, {"from": setData}] }).countDocuments((err, result) => {
				if (!err) {
					data.msg = 'Success'
					if (data.info.TxCount !== result) {
						data.info.TxCount = result
						AccountInfo.update({'address': setData}, {'TxCount': data.info.TxCount}, {'updateTime': Date.parse(new Date()) / 1000}).exec((err, result) => {
							if (err) {
								console.log(err)
							} else {
								console.log(result)
							}
						})
					}
					cb(null, data)
				} else {
					data.msg = 'Error'
					data.info = ''
					cb(data)
				}
			})
		}
	], (err, data) => {
		if (err) {
			socket.emit('accountDtil', err)
		} else {
			socket.emit('accountDtil', data)
		}
		// socket.emit('accountDtil', data)
		console.log('accountDtil callback data success')
	})
}

function sendData (socket) {
	socket.on('transaction', (req) => {
		transaction(socket, req, 'transaction')
	})

	socket.on('RefreshData', (req) => {
		blocks(socket, req, 'blocksRefresh')
		transaction(socket, req, 'transactionRefresh')
	})

	socket.on('blocks', (req) => {
		blocks(socket, req, 'blocks')
	})

	socket.on('transferDtil', (req) => {
		transferDtil(socket, req, 'transferDtil')
	})
	socket.on('transferPage', (req) => {
		transferPage(socket, req, 'transferPage')
	})
	socket.on('getAvgData', (req) => {
		getAvgData(socket, req, 'getAvgData')
	})
	socket.on('pendingBlocks', (req) => {
		pendingBlocks(socket, req, 'pendingBlocks')
	})
	socket.on('blockNum', (req) => {
		blockNum(socket, req, 'blockNum')
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
module.exports.sendData = sendData