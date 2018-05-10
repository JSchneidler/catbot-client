const express = require('express');
const path = require('path');
const api = require('./api');

const app = express();

const PORT = process.env.PORT || 8888;

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.all('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));

app.listen(PORT, () => console.log('Express listening on port ' + PORT));