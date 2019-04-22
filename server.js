/*
Main server management file
*/
const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.io = io;


// Connect to mongodb
require('./config/databasesetup')(mongoose);

// Check if there is a pre-defined port, otherwise use 8080
const port = process.env.PORT || 80;

// Declare the use of the ejs view engine
app.set('view engine', 'ejs');

// Other packages
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));

// Routes setup
require('./config/routes')(app);

// Declare the folder to use for public files, such as javascripts, images and css
app.use(express.static('public'));

io.on('connection', function(socket){
  console.log("Connection received!");
  socket.on('test', function(data){
    console.log("Client connected with message: " + data.msg);
  });
  socket.emit('test', 'Connection successful');
});

http.listen(80);

console.log("Listening on port: " + port);
