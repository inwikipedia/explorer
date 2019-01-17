let $$ = {}


if (process.env.NODE_ENV === 'development') {
	$$.baseUrl = '/api'
} else {
	$$.baseUrl = 'https://explorer.dcrm.network'
}

$$.serverUrl = 'http://localhost:8083'

$$.timesFun = function (time, now) {
	// let nowTime = Date.parse(now)
	let nowTime = now
	// console.log(nowTime)
	time = isNaN(time) ? time : (time.length >= 10 ? time : (time * 1000))
	let dataTime = 0, callback = 0
	if (isNaN(time)) {
		dataTime = Date.parse(time)
	} else {
		dataTime = time
	}
	let timeDiffer = (nowTime - dataTime) / 1000
	timeDiffer = timeDiffer > 0 ? timeDiffer : 1
// 	console.log(nowTime)
// 	console.log(dataTime)
// 	console.log(timeDiffer)
	if (timeDiffer < 60) { //seconds
		// console.log(1)
		callback = this.timeSec(timeDiffer)
	} else if (timeDiffer < (60 * 60)) { //minute
		// console.log(2)
		callback = this.timeMin(timeDiffer)
	} else if (timeDiffer < (60 * 60 * 24)) { //hours
		// console.log(3)
		callback = this.timeHour(timeDiffer, 'min')
	} else { //day
		// console.log(4)
		callback = this.timeDay(timeDiffer, 'hour')
	}
	// console.log(callback)
	return callback
}

$$.timeSec = function (time) {
	return time + 's ago'
}

$$.timeMin = function (time, type) {
	let seconds = time - (Math.floor(time / 60) * 60)
	let callback = Math.floor(time / 60) + ' mins ' + this.timeSec(seconds)
	if (type === 'min') {
		callback = Math.floor(time / 60) + ' mins '
	} else {
		callback = Math.floor(time / 60) + ' mins ' + this.timeSec(seconds)
	}
	return callback
}

$$.timeHour = function (time, type) {
	let hours = Math.floor(time / (60 * 60))
	let minute = this.timeMin(time - (hours * 60 * 60), type)
	let callback = hours + ' hours ' + minute
	if (type === 'hour') {
		callback = hours + ' hours '
	} else {
		callback = hours + ' hours ' + minute
	}
	return callback
}

$$.timeDay = function (time, type) {
	let days = Math.floor(time / (60 * 60 * 24))
	let hours = this.timeHour(time - (days * 60 * 60 * 24), type)
	let callback = days + ' days ' + hours
	return callback
}

$$.timeToEN = (time, type) => {
	let weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat ']
	let mounth = ['Jan\'', 'Feb\'', 'Mar\'', 'Apr\'', 'May\'', 'Jun\'', 'Jul\'', 'Aug\'', 'Sept\'', 'Oct\'', 'Nov\'', 'Dec\'']
	let date = new Date(time * 1000)
	let Y = date.getFullYear()
	let M = date.getMonth()
	let D = date.getDate()
	let W = date.getDay()
	if (type === 'all') {
		weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday ', 'Thursday', 'Friday', 'Saturday ']
		mounth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// 		console.log(M)
// 		console.log(mounth[M])
		return weeks[W] + ', ' + mounth[M] + ' ' + D + ', ' + Y
	}
	return mounth[M] + ' ' + D
}

$$.cutStr = (str, start, end) => {
	if (!str) return ''
	end = end ? end : start
	// console.log(str)
	let str1 = str.substr(0, start)
	let str2 = str.substr(str.length - end)
	return str1 + '...' + str2
}

$$.thousandBit = (num, dec = 2) => {
  num = Number(num)
  if (isNaN(num)) {
    num = 0
    num = num.toFixed(dec)
  } else {
    if (isNaN(dec)) {
      // console.log(num)
      if (num.toString().indexOf('.') === -1) {
        num = num.toLocaleString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,').toLocaleString()
      } else {
        let numSplit = num.toString().split('.')
        numSplit[1] = numSplit[1].length > 9 ? numSplit[1].substr(0, 8) : numSplit[1]
        // console.log(numSplit)
        num = numSplit[0].toLocaleString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,').toLocaleString()
        num = num + '.' + numSplit[1]
      }
    } else {
      num = num.toFixed(dec).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').toLocaleString()
    }
  }
  return num
}

$$.web3 = function (that) {
  let Web3 = require('web3')
  let web3
	// let url = this.baseUrl
	let url = 'http://54.169.254.177:40415'
	// console.log(this.baseUrl)
  try {
    web3 = new Web3(new Web3.providers.HttpProvider(url))
  } catch (error) {
    web3 = new Web3()
    console.log(error)
  }
  that.web3 = web3
}

$$.ajax = function ($http, url, param) {
	let Qs = require('qs')
	let callback = new Promise(function (resolve) {		
		$http.post(url, Qs.stringify(param), {
			headers: {'Content-Type':'application/x-www-form-urlencoded'}
		}).then(res => {
			let data = res.data ? res.data : []
			resolve(data)
		})
	})
	return callback
}

export default $$