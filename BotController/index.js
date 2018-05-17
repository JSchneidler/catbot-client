const net = require('net');

const BOT_IP = process.env.BOT_IP;
const BOT_PORT = process.env.BOT_PORT;

module.exports = class BotController {
  constructor() {
    this.connect();
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        this.client = net.createConnection(BOT_PORT, BOT_IP);
        this.client.on('connect', resolve);
        this.client.on('error', err => {
          console.error('Could not connect to CatBot at ' + BOT_IP + ':' + BOT_PORT);
          reject(err);
        });
        this.client.on('close', () => this.client = null);
      }

      else resolve(this.client);
    });
  }

  sendCommand(command) {
    console.log(command);
    this.client.write(command);
  }
};