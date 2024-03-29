var express = require('express'),
  cluster = require('cluster'),
  net = require('net'),
  sio = require('socket.io');

var port = 3000,
  num_processes = require('os').cpus().length;

if (cluster.isMaster) {
  var workers = [];

  var spawn = function(i) {
    workers[i] = cluster.fork();
    workers[i].on('exit', function(code, signal) {
      console.log('respawning worker', i);
      spawn(i);
    });
  };

  for (var i = 0; i < num_processes; i++) {
      spawn(i);
  }

  // ip hash
  var worker_index = function(ip, len) {
    var s = '';
    for (var i = 0, _len = ip.length; i < _len; i++) {
      if (!isNaN(ip[i])) {
        s += ip[i];
      }
    }

    return Number(s) % len;
  };

  var server = net.createServer({ pauseOnConnect: true }, function(connection) {
      var worker = workers[worker_index(connection.remoteAddress, num_processes)];
      worker.send('sticky-session:connection', connection);
  }).listen(port);
} else {
  // worker
  var app = new express();

  // handshake server.
  var server = app.listen(0, 'localhost'),
      io = sio(server);

  process.on('message', function(message, connection) {
    if (message !== 'sticky-session:connection') {
        return;
    }

    server.emit('connection', connection);

    connection.resume();
  });
}