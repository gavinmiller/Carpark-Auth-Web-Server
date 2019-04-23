/*
* Router for interacting with the vehicles db collection
*/
const express = require('express');
const router = express.Router();
const request = require('request');

var Vehicle = require('../models/vehicle');

// Gets a vehicle stored in the db
router.get('/getvehicle', function(req, res){
  var licensePlate = req.query.licensePlate;

  Vehicle.findOne({license_plate: licensePlate}, function(err, vehicle){
    if (err) throw err;

    //console.log(vehicle);
    if (vehicle){
      res.send(vehicle);
    }
    else {
      res.send({'authorised':false});
    }
    return;
  });
});

// Adds a vehicle and entry time to the db
router.get('/addvehicle', function(req, res){
  var licensePlate = req.query.licensePlate;
  var entryTime = req.query.entryTime;

  Vehicle.addEntryTime(licensePlate, entryTime, function(vehicle){
    if (vehicle){
      res.send({success:true, vehicle:vehicle});
    }
    else{
      res.send({success:false});
    }

  });
});

// UNUSED adds an exit time for the vehicle on the way out
router.get('/exitvehicle', function(req, res){
  var licensePlate = req.query.licensePlate;
  var exitTime = req.query.exitTime;

  Vehicle.addExitTime(licensePlate, exitTime, function(success, vehicle){
    if (success){

      res.send({success:true, vehicle:vehicle});
    }
    else {

      res.send({success:false});
    }
  });
});

module.exports = router;
