const express = require('express');
const router = express.Router();

var Vehicle = require('../models/vehicle');
var ParkingSpace = require('../models/parkingspace');

const SHOW_PARKING_SPACE_CONTROLS = true;

router.get('/', function(req, res){
  Vehicle.find({}, function(err, vehicles){
    if (err) throw err;

    ParkingSpace.find({}, function(err, spaces){
      if (err) throw err;

      res.render('index', {vehicles: vehicles, spaces: spaces, showParkingSpaceControls:SHOW_PARKING_SPACE_CONTROLS});
    });
  });
});

router.get('/message', function(req, res){
  var message = req.query.msg;
  console.log("Message sent: " + message);

  if (req.app && req.app.io){
    req.app.io.emit('displayMessage', message);
  }

  res.send({'success':true});
});

router.get('/getvacancies', function(req, res){
  ParkingSpace.getFreeSpace(function(freeSpace){
    res.send({vacancies:freeSpace});
  });
});

router.post('/addvehicle', function(req, res){
  var licensePlate = req.body.licenseplate.toUpperCase();
  var authorisedBody = req.body.authorised;
  var authorised = false;
  if (authorisedBody == 'on'){
    authorised = true;
  }

  Vehicle.addVehicle(licensePlate, Date.now(), authorised, function(success, vehicle){
    if (!success){
      console.log("Vehicle already in db...");
    }

    res.redirect('/');
  });
});

router.post('/addparkingspace', function(req, res){
  var id = req.body.id;
  var floor = req.body.floor;
  var direction = req.body.direction;

  ParkingSpace.addParkingSpace(id, {floor:floor, direction:direction}, function(success){
    res.redirect('/');
  });
});

router.get('/removevehicle', function(req, res){
  var licensePlate = req.query.licensePlate;

  Vehicle.removeVehicle(licensePlate, function(success){
    res.send({success:success});
  });
});

router.get('/removespace', function(req, res){
  var id = req.query.id;

  ParkingSpace.removeParkingSpace(id, function(success){
    res.send({success:success});
  });
});

module.exports = router;
