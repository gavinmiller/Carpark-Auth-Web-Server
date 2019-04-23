/*
* Index router file, handles most routes
*/

const express = require('express');
const router = express.Router();

var Vehicle = require('../models/vehicle');
var ParkingSpace = require('../models/parkingspace');

const SHOW_PARKING_SPACE_CONTROLS = true; // Shows/hides the form for adding parking spaces manually

// Main page rendering
router.get('/', function(req, res){
  Vehicle.find({}, function(err, vehicles){
    if (err) throw err;

    ParkingSpace.find({}, function(err, spaces){
      if (err) throw err;

      res.render('index', {vehicles: vehicles, spaces: spaces, showParkingSpaceControls:SHOW_PARKING_SPACE_CONTROLS});
    });
  });
});

// Sends a simple 'display this' message to the display pi
router.get('/message', function(req, res){
  var message = req.query.msg;
  console.log("Message sent: " + message);

  if (req.app && req.app.io){
    req.app.io.emit('displayMessage', message);
  }

  res.send({'success':true});
});

// Sends a status code and message to the display pi to indicate what kind of message is to be displayed
router.get('/displayadvanced', function(req, res){
  var statusCode = req.query.statusCode;
  var message = req.query.message;

  if (req.app && req.app.io){
    req.app.io.emit('displayAdvanced', {status_code:statusCode, message:message});
  }

  res.send({'success':true});
});

// Returns true or false depending on if there are any unoccupied parking spaces
router.get('/getvacancies', function(req, res){
  ParkingSpace.getFreeSpace(function(freeSpace){
    console.log(freeSpace);
    if (freeSpace && req.app && req.app.io){
      console.log("Inside");
      req.app.io.emit('displayAdvanced',{'status_code':'1', 'message':'Floor ' + freeSpace.location.floor + ', ' + freeSpace.location.direction});
    }

    res.send({vacancies:freeSpace});
  });
});

// Form for adding vehicles to the db
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

// Query to initialise a parking space on parking space pi startup
router.get('/initparkingspace', function(req, res){
  var id = req.query.id;
  var floor = req.query.floor;
  var direction = req.query.direction;

  ParkingSpace.addParkingSpace(id, {floor:floor, direction:direction}, function(success){
    res.send({success:success});
  });
});

// Form to add a parking space to the db
router.post('/addparkingspace', function(req, res){
  var id = req.body.id;
  var floor = req.body.floor;
  var direction = req.body.direction;

  ParkingSpace.addParkingSpace(id, {floor:floor, direction:direction}, function(success){
    res.redirect('/');
  });
});

// Removes a vehicle with given id from db
router.get('/removevehicle', function(req, res){
  var licensePlate = req.query.licensePlate;

  Vehicle.removeVehicle(licensePlate, function(success){
    res.send({success:success});
  });
});

// Updates the given parking space with whether or not it is occupied
router.get('/parkingspace', function(req, res){
  var id = req.query.id;
  var status = false;

  if (req.query.status == 'True'){
    status = true;
  }

  ParkingSpace.updateParkingSpace(id, status, function(success){
    res.send({'success':success});
  })
});

// Removes the given parking space
router.get('/removespace', function(req, res){
  var id = req.query.id;

  ParkingSpace.removeParkingSpace(id, function(success){
    res.send({success:success});
  });
});

module.exports = router;
