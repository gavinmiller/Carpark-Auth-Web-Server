const express = require('express');
const router = express.Router();

var Vehicle = require('../models/vehicle');

router.get('/', function(req, res){
  Vehicle.find({}, function(err, post){
    if (err) throw err;
    
    res.render('index', {vehicles: post});
  });

});

module.exports = router;
