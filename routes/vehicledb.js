const express = require('express');
const router = express.Router();
const request = require('request');

var Vehicle = require('../models/vehicle');

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
