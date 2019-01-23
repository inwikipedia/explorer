require( './db.js' )
let mongoose = require( 'mongoose' )
let Block = mongoose.model( 'Block' )
let Transaction = mongoose.model( 'Transaction' )
let Account = mongoose.model( 'Account' )
let TransactionChart = mongoose.model( 'TransactionChart' )
let express = require('express')
let router = express.Router()

// router.post('/transfer', (req, res) => {
function transfer(socket, req) {
	let data = {
		msg: '',
		info: ''
	}
// 	let setData = {
// 		startTime: req.startTime ? req.startTime : (Date.parse(new Date()) / 1000 - (1 * 60 * 60 * 24 * 60)),
// 		endTime: req.endTime ? req.endTime : (Date.parse(new Date()) / 1000),
// 	}
	TransactionChart.find({}).lean(true).sort({"timestamp": 1}).exec((err, result) => {
		if (!err) {
			// total()
			data.msg = 'Success'
			data.info = result
			
		} else {
			data.msg = 'Error'
			data.info = ''
		}
		// res.json(data)
		socket.emit('transfer', data)
	})
}

// let Web3 = require('web3')
// let web3 = new Web3(new Web3.providers.HttpProvider('http://54.169.254.177:40415'))
function sendData (socket) {
	socket.on('transfer', (req) => {
		transfer(socket, req)
	})
}

module.exports.sendData = sendData