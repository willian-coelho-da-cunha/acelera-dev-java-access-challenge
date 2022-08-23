const express = require('express');
const bodyParser = require('body-parser');

const server = express();

const fs = require('fs');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', false);
  next();
});

const routes = require('./routes/routes.js')(server, fs);

const launch = server.listen(3001, () => {
  console.log('Listening on port %s...', launch.address().port);
});
