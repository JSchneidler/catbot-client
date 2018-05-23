const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const api = require('./api');
const socketServer = require('./socketServer');

require('./passport');

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);

socketServer.attach(server);

app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use((req, res, next) => {
  res.success = data => res.status(200).json({ data });
  res.fail = error => res.status(400).json({ error });

  next();
});

app.use('/api', api);

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

server.listen(PORT, () => console.log('HTTP server listening on port ' + PORT));