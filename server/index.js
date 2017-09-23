const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// default to a 'localhost' configuration:
let connection_string = '127.0.0.1:27017/smartbell';

// DB Setup
mongoose.connect('mongodb://'+ connection_string);

// App setup
app.use(morgan('combined'));
app.use(cors());
//app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));
router(app);

// Server setup
const port = 3090;
const ip = '0.0.0.0';
const server = http.createServer(app);
server.listen(port, ip);
console.log("Listening on " + ip + ", port " + port );