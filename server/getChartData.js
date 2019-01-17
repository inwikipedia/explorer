require( './db.js' )
let mongoose = require( 'mongoose' )
let Block = mongoose.model( 'Block' )
let Transaction = mongoose.model( 'Transaction' )
let Account = mongoose.model( 'Account' )
let express = require('express')
let router = express.Router()

router.post('/transfer', (req, res) => {
	let data = {
		msg: '',
		info: ''
	}
	let setData = {
		startTime: req.body.startTime ? req.body.startTime : (Date.parse(new Date()) / 1000 - (1 * 60 * 60 * 24 * 60)),
		endTime: req.body.endTime ? req.body.endTime : (Date.parse(new Date()) / 1000),
	}
	Transaction.find({'timestamp': {'$gte': setData.startTime, '$lt': setData.endTime}}).sort({"timestamp": 1}).exec((err, result) => {
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
})

module.exports = router