const Gpio = require("onoff").Gpio;
const relay = new Gpio(4, "out");
const button = new Gpio(5, "in", "rising", { debounceTimeout: 10 });

button.watch((err, value) => {
  if (err) {
    throw err;
  }
  relay.writeSync(relay.readSync() ^ 1);
});

process.on("SIGINT", _ => {
  relay.unexport();
  button.unexport();
});
