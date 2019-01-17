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
	console.log('setData')
	console.log(setData)
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
		Transaction.find({}).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.body.pageSize)).exec((err, result) => {
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
		Transaction.find({'hash': setData.hash}).exec((err,result) => {
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
		Transaction.find({'timestamp': setData.page}).limit(1).exec((err,result) => {
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
		Block.find({}).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.body.pageSize)).exec((err,result) => {
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
		Block.find({"hash": ""}).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.body.pageSize)).exec((err,result) => {
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
		Block.find({'number': Number(setData.number)}).exec((err, result) => {
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
		Account.find({}).sort({"timestamp": -1}).skip(setData.skip).limit(Number(req.body.pageSize)).exec((err,result) => {
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