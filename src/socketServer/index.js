const WebSocket = require('ws');
const BotController = require('BotController');

const botController = new BotController();

let socketServer;

function attach(httpServer) {
  socketServer = new WebSocket.Server({ server: httpServer });

  socketServer.on('connection', ws => {
    ws.on('message', message => {
      if (Buffer.isBuffer(message) && message.length === 4) botController.sendCommand(message);
    });
  });
}

module.exports = { attach };