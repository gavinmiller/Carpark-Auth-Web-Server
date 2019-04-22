const express = require('express');
const router = express.Router();

var Vehicle = require('../models/vehicle');
var ParkingSpace = require('../models/parkingspace');

router.get('/', function(req, res){
  Vehicle.find({}, function(err, post){
    if (err) throw err;

    res.render('index', {vehicles: post});
  });

});

router.get('/message', function(req, res){
  var message = req.query.msg;
  console.log("Message sent: " + message);
  req.app.io.emit('displayMessage', message);
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

module.exports = router;
