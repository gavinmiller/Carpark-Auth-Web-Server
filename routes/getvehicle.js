const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', function(req, res){
  var licensePlate = req.query.licensePlate;

  res.send({
  "authorised": true
  });
});

module.exports = router;
