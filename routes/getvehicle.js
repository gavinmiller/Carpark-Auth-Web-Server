const express = require('express');
const router = express.Router();
const request = require('request');

var Vehicle = require('../models/vehicle');

router.get('/', function(req, res){
  var licensePlate = req.query.licensePlate;

  Vehicle.findOne({license_plate: licensePlate}, function(err, vehicle){
    if (err) throw err;

    console.log(vehicle);
    if (vehicle){
      res.send(vehicle);
    }
    else {
      res.send({'authorised':false});
    }
    return;
  });
});

module.exports = router;
