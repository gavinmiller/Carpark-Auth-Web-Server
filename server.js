/*
Main server management file
*/
const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const morgan = require('morgan');

const app = express();

// Connect to mongodb
//require('./config/databasesetup')(mongoose);

// Check if there is a pre-defined port, otherwise use 8080
const port = process.env.PORT || 8080;

app.use(morgan('dev'));

// Routes setup
require('./config/routes')(app);

// Begin listening for requests
app.listen(port);

console.log("Listening on port: " + port);
