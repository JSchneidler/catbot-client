require('dotenv').config();

const express = require('express');
const http = require('http');
const path = require('path');
const api = require('./api');
const socketServer = require('./SocketServer');

const app = express();
const server = http.createServer(app);

socketServer.attach(server);

const PORT = process.env.PORT || 8888;

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.all('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));

server.listen(PORT, () => console.log('HTTP server listening on port ' + PORT));