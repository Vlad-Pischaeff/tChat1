const express = require('express');

const app = express();
const server = require('http').createServer(app);

require('./startup/db')();
require('./startup/cors')(app);
require('./startup/bodyParser')(app);
require('./startup/routes')(app);
require('./startup/server')(server);
