const express = require('express');
const app = express();
const Gpio = require('onoff').Gpio;
const relay = new Gpio(4, 'out');

app.use('/', express.static(__dirname + '/public'));
app.get('/toggle', (request, response) => {
  relay.writeSync(relay.readSync() ^ 1);
  return response.status(200).send('Relay toggled');
});

app.listen(3000, () => {
  console.log('server listerning...');
});