var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// The divesite db model
var VehicleSchema = new Schema({
  license_plate: String,
  authorised: {type: Boolean, default: true},
  access_times:[{entry_time:Date, exit_time:Date}]
});

var Vehicle = module.exports = mongoose.model('vehicles', VehicleSchema);

module.exports.addEntryTime = function(licensePlate, datetime, callback){
  Vehicle.findOne({license_plate:licensePlate}, function(err, vehicle){
    if (err) throw err;

    if (vehicle){
      vehicle.access_times.push({entry_time:datetime});
    }
    else {
      vehicle = new Vehicle();
      vehicle.license_plate = licensePlate;
      vehicle.access_times = [{entry_time:datetime}];
    }

    vehicle.save(function(err, post){
      if (err) throw err;

      callback(post);
    });
  });
}
