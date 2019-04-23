/*
* DVLA API route handling
*/

const express = require('express');
const router = express.Router();
const request = require('request');

const apiKey = "kSG768fKyaHy45wQ";

// Searches dvla search websites api for info on the given license plate and returns it to the functional gateway pi
router.get('/', function(req, res){
  var licensePlate = req.query.licensePlate;
  var apiurl = "https://dvlasearch.appspot.com/DvlaSearch?apikey=" + apiKey + "&licencePlate=" + licensePlate;

  request(apiurl, function(err, response, body){
    if (!err){
      var jsonObject = JSON.parse(body);

      res.send(jsonObject);
    }
  });

  // res.send({
  // "vin": "WVGZZZ5NZAW007903",
  // "make": "Vauxhall",
  // "model": "Vectra",
  // "cylinderCapacity": "1968cc",
  // "numberOfDoors": "5",
  // "sixMonthRate": "112.75",
  // "twelveMonthRate": "205.00",
  // "dateOfFirstRegistration": "23 July 2009",
  // "yearOfManufacture": "2009",
  // "co2Emissions": "167 g/km",
  // "fuelType": "Diesel (other values Petrol/Electric)",
  // "taxStatus": "Not taxed",
  // "transmission": "Manual (other values automatic / cvt)",
  // "colour": "Silver",
  // "typeApproval": "M1",
  // "wheelPlan": "2 AXLE RIGID BODY",
  // "revenueWeight": "3850kg",
  // "taxDetails": "Tax due: 06 February 2015",
  // "motDetails": "Expires: 23 July 2015",
  // "taxed": false,
  // "mot": false
  // }); // TEST DATA
});

module.exports = router;
