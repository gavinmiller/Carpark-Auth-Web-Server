var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// The divesite db model
var VehicleSchema = new Schema({
  license_plate: String,
  authorised: {type: Boolean, default: true}
});

var Vehicle = module.exports = mongoose.model('vehicles', VehicleSchema);
