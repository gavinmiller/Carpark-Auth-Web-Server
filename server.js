/*
Main server management file
*/
const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const morgan = require('morgan');

const app = express();


// Connect to mongodb
require('./config/databasesetup')(mongoose);

// Check if there is a pre-defined port, otherwise use 8080
const port = process.env.PORT || 8080;

// Declare the use of the ejs view engine
app.set('view engine', 'ejs');

// Other packages
app.use(morgan('dev'));

// Routes setup
require('./config/routes')(app);

// Declare the folder to use for public files, such as javascripts, images and css
app.use(express.static('public'));

// Begin listening for requests
//app.listen(port);

const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(80);

console.log("Listening on port: " + port);

io.on('connection', function(socket){
  console.log("Data");
});
