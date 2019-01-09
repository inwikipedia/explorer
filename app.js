const http = require('http')
const https = require('https')
const express = require('express')
const app = express()
const fs = require('fs')
const net = require('net')
const bodyParser = require('body-parser')

const httpsPort = 8081
const httpPort = 8082

const privateKey = fs.readFileSync('./server/keys/privkey.pem', 'utf-8')
const cretificats = fs.readFileSync('./server/keys/cert.pem', 'utf-8')
const credenticals = {key: privateKey, cert: cretificats}

app.use(express.static(require('path').join(__dirname, 'public')))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', '3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

const httpsServer = https.createServer(credenticals, app)
httpsServer.listen(httpsPort)

const httpServer = http.createServer(app).listen(httpPort)

// console.log(io)
// io.sockets.on('connection', function (socket) {
//   console.log('a user')
// })

let io
/*
net.createServer(function (socket) {
  socket.once('data', function (buf) {
    // console.log(buf[0])
    var address = buf[0] === 22 ? httpsPort : httpPort
    // var httpInfo = buf[0] === 22 ? httpsServer : httpServer
    if (buf[0] === 22) {
      io = require('socket.io')(httpsServer)
    } else {
      io = require('socket.io')(httpServer)
    }
    var proxy = net.createConnection(address, function () {
      proxy.write(buf)
      socket.pipe(proxy).pipe(socket)
    })
    proxy.on('error', function (err) {
      console.log(err)
    })
  })
  socket.on('error', function (err) {
    console.log(err)
  })
  // console.log('success')
}, app).listen(8083)
*/
io = require('socket.io')(httpServer)

io.on('connection', function (socket) {
  console.log('a user')
})
