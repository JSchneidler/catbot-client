const WebSocket = require('ws');
const BotController = require('../BotController');

const botController = new BotController();

let socketServer;

function attach(httpServer) {
  socketServer = new WebSocket.Server({ server: httpServer });

  registerListeners();
}

function registerListeners() {
  socketServer.on('connection', ws => {
    console.log('New connection');

    ws.on('message', message => {
      if (Buffer.isBuffer(message) && message.length === 2) botController.sendCommand(message);
    });
  });
}

module.exports = { attach };