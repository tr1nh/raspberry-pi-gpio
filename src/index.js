const express = require('express');
const app = express();
const Gpio = require('onoff').Gpio;
const relay = new Gpio(4, 'out');
const http = require("http");
const socketIo = require("socket.io");

app.use('/', express.static(__dirname + '/public'));
app.get('/toggle', (request, response) => {
  relay.writeSync(relay.readSync() ^ 1);
  io.sockets.emit("button_pressed", relay.readSync());
  return response.status(200).send('Relay toggled');
});

const server = http.createServer(app).listen(3000, () => {
  console.log('server listening...');
});

const io = socketIo();
io.attach(server);
io.on('connection', function (socket) {
  console.log('New connection');

  socket.on('web_relay_toggle', function (data) {
    relay.writeSync(relay.readSync() ^ 1);
  })
});
