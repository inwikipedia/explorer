let $$ = {}


if (process.env.NODE_ENV === 'development') {
	$$.baseUrl = '/api'
} else {
	$$.baseUrl = 'https://explorer.dcrm.network'
}

$$.timesFun = function (time, now) {
	// let nowTime = Date.parse(now)
	let nowTime = now
	// console.log(nowTime)
	time = isNaN(time) ? time : (time.length > 10 ? time : (time * 1000))
	let dataTime, callback
	if (isNaN(time)) {
		dataTime = Date.parse(time)
	} else {
		dataTime = time
	}
// 	console.log(time)
// 	console.log(dataTime)
	// dataTime = 1546758343000
	// dataTime = 1547004847000
	let timeDiffer = (nowTime - dataTime) / 1000
	// console.log(timeDiffer)
	if (timeDiffer < 60) { //seconds
		// console.log('seconds:' + timeDiffer)
		callback = this.timeSec(timeDiffer)
	} else if (timeDiffer < (60 * 60)) { //minute
		// console.log('minute:' + (timeDiffer < 3600))
		callback = this.timeMin(timeDiffer)
	} else if (timeDiffer < (60 * 60 * 24)) { //hours
		// console.log('hours:' + timeDiffer)
		callback = this.timeHour(timeDiffer, 'min')
	} else { //day
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

$$.cutStr = (str, start, end) => {
	end = end ? end : start
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

export default $$