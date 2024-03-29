require( './db.js' )
let mongoose = require( 'mongoose' )
let Block = mongoose.model( 'Block' )
let Transaction = mongoose.model( 'Transaction' )
let Account = mongoose.model( 'Account' )
let express = require('express')
let router = express.Router()
mongoose.connection.on("open", () => {  
  console.log("数据库连接成功"); 
})

router.post('/transaction', (req, res) => {
	let setData = {
		pageSize: req.body.pageSize ? req.body.pageSize : 20,
		skip: 0
	}
	let data = {
		msg: '',
		info: '',
		total: ''
	}
	setData.skip = req.body.pageNum ? (Number(req.body.pageNum - 1) * Number(setData.pageSize)) : 0
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
		Transaction.find({}).lean(true).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.body.pageSize)).exec((err, result) => {
			if (!err) {
				data.msg = 'Success'
				data.info = result
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			res.json(data)
		})
	}
	total()
})

router.post('/transferDtil', (req, res) => {
	let setData = {
		hash: req.body.hash ? req.body.hash : 0
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
				// console.log(result[0])
// 				console.log(result[0].gasPrice)
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			res.json(data)
		})
	}
	info()
})

router.post('/transferPage', (req, res) => {
	let setData = {
		timestamp: req.body.timestamp ? req.body.timestamp : 0
	}
	if (req.body.page === 'next') {
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
			res.json(data)
		})
	}
	info()
})

router.post('/transferAvg', (req, res) => {
	let dataArr = req.body.dataArr.length > 0 ? req.body.dataArr : []
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
					res.json(data)
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
})

router.post('/blocks', (req, res) => {
	let setData = {
		pageSize: req.body.pageSize ? req.body.pageSize : 20,
		skip: 0
	}
	let data = {
		msg: '',
		info: '',
		total: ''
	}
	setData.skip = req.body.pageNum ? (Number(req.body.pageNum - 1) * Number(setData.pageSize)) : 0
	
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
		Block.find({}).lean(true).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.body.pageSize)).exec((err,result) => {
			if (!err) {
				// total()
				data.msg = 'Success'
				data.info = result
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			res.json(data)
		})
	}
	total()
})

router.post('/pendingBlocks', (req, res) => {
	let setData = {
		pageSize: req.body.pageSize ? req.body.pageSize : 20,
		skip: 0
	}
	let data = {
		msg: '',
		info: '',
		total: ''
	}
	setData.skip = req.body.pageNum ? (Number(req.body.pageNum - 1) * Number(setData.pageSize)) : 0
	
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
		Block.find({"hash": ""}).lean(true).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.body.pageSize)).exec((err,result) => {
			if (!err) {
				// total()
				data.msg = 'Success'
				data.info = result
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			res.json(data)
		})
	}
	total()
})

router.post('/blockNum', (req, res) => {
	let setData = {
		number: req.body.number ? req.body.number : 0
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
			res.json(data)
		})
	}
	info()
})

router.post('/blockAvg', (req, res) => {
	let dataArr = req.body.dataArr.length > 0 ? req.body.dataArr : []
	console.log('blockAvg:')
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
					res.json(data)
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
})

router.get('/blockTime', (req, res) => {
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
			res.json(data)
		})
	}
	info()
})


router.post('/topAccounts', (req, res) => {
	let setData = {
		pageSize: req.body.pageSize ? req.body.pageSize : 20,
		skip: 0
	}
	let data = {
		msg: '',
		info: '',
		total: ''
	}
	setData.skip = req.body.pageNum ? (Number(req.body.pageNum - 1) * Number(setData.pageSize)) : 0
	
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
		Account.find({}).lean(true).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.body.pageSize)).exec((err,result) => {
			if (!err) {
				// total()
				data.msg = 'Success'
				data.info = result
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			res.json(data)
		})
	}
	total()
})

router.post('/topAccounts', (req, res) => {
	let setData = {
		pageSize: req.body.pageSize ? req.body.pageSize : 20,
		skip: 0
	}
	let data = {
		msg: '',
		info: '',
		total: ''
	}
	setData.skip = req.body.pageNum ? (Number(req.body.pageNum - 1) * Number(setData.pageSize)) : 0
	
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
		Account.find({}).lean(true).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.body.pageSize)).exec((err,result) => {
			if (!err) {
				// total()
				data.msg = 'Success'
				data.info = result
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			res.json(data)
		})
	}
	total()
})

router.post('/accountTxn', (req, res) => {
	let setData = {
		pageSize: req.body.pageSize ? req.body.pageSize : 20,
		skip: 0,
		addr: req.body.addr
	}
	let data = {
		msg: '',
		info: '',
		total: ''
	}
	setData.skip = req.body.pageNum ? (Number(req.body.pageNum - 1) * Number(setData.pageSize)) : 0
	
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
		Transaction.find({ $or: [{"to": setData.addr}, {"from": setData.addr}] }).lean(true).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.body.pageSize)).exec((err,result) => {
			if (!err) {
				// total()
				data.msg = 'Success'
				data.info = result
			} else {
				data.msg = 'Error'
				data.info = ''
			}
			res.json(data)
		})
	}
	total()
})

module.exports = router