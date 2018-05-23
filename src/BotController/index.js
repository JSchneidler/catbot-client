const net = require('net');

const BOT_HOST = process.env.BOT_HOST;
const BOT_PORT = process.env.BOT_PORT;

module.exports = class BotController {
  constructor() {
    this.host = BOT_HOST;
    this.port = BOT_PORT;

    this.connect();
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        this.client = new net.Socket();

        this.client.setNoDelay();
        this.client.setKeepAlive();

        this.client.on('close', () => this._clearClient());
        this.client.on('error', err => {
          console.error('Could not connect to CatBot at ' + BOT_HOST + ':' + BOT_PORT, err);
          reject(err);
        });

        this.client.connect(BOT_PORT, BOT_HOST, resolve);
      } else resolve();
    });
  }

  _clearClient() {
    if (this.client) this.client.destroy();
    this.client = null;
  }

  write(data) {
    return this.connect()
      .then(() => new Promise(resolve => this.client.write(data, () => {
        console.log('Wrote:', data);
        resolve();
      })));
  }

  sendCommand(command) {
    return this.write(command);
  }
};