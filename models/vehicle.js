/*
* Vehicle model for the mongodb
*/
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// The vehicle db model
var VehicleSchema = new Schema({
  license_plate: String,
  authorised: {type: Boolean, default: true},
  access_times:[{entry_time:Date, exit_time:Date}],
  is_parked:Boolean,
  last_access_time: Date
});

var Vehicle = module.exports = mongoose.model('vehicles', VehicleSchema);

module.exports.addVehicle = function(licensePlate, datetime, authorised, callback){
  Vehicle.findOne({license_plate:licensePlate}, function(err, vehicle){
    if (err) throw err;

    if (vehicle){
      // Vehicle exists
      callback(false);
    }
    else {
      var newVehicle = new Vehicle();
      newVehicle.license_plate = licensePlate;
      newVehicle.authorised = authorised;
      newVehicle.is_parked = true;
      newVehicle.access_times = [{entry_time:datetime}];
      newVehicle.last_access_time = datetime;

      newVehicle.save(function(err, post){
        if (err) throw err;

        callback(true, post);
      })
    }
  });
}

module.exports.addEntryTime = function(licensePlate, datetime, callback){
  Vehicle.findOne({license_plate:licensePlate}, function(err, vehicle){
    if (err) throw err;

    if (vehicle){
      vehicle.access_times.push({entry_time:datetime});
      vehicle.last_access_time = datetime;
      vehicle.is_parked = true;
    }
    else {
      vehicle = new Vehicle();
      vehicle.license_plate = licensePlate;
      vehicle.access_times = [{entry_time:datetime}];
      vehicle.last_access_time = datetime;
      vehicle.is_parked = true;
    }

    vehicle.save(function(err, post){
      if (err) throw err;

      callback(post);
    });
  });
}

module.exports.addExitTime = function(licensePlate, exitTime, callback){
  Vehicle.findOne({license_plate:licensePlate}, function(err, vehicle){
    if (err) throw err;

    if (vehicle){
      var accessTimes = vehicle.access_times;
      var found = false;

      for (var i = 0; i < accessTimes.length; i++) {
        if (!accessTimes[i].exit_time){
          accessTimes[i].exit_time = exitTime;
          found = true;
          break;
        }
      }

      if (found){
        vehicle.access_times = accessTimes;
        vehicle.last_access_time = exitTime;
        vehicle.is_parked = false;

        vehicle.save(function(err, newVehicle){
          if (err) throw err;

          callback(true, newVehicle);
        });
      }
      else {
        callback(false);
      }
    }
    else {
      callback(false);
    }
  });
}

module.exports.removeVehicle = function(licensePlate, callback){
  Vehicle.deleteOne({license_plate:licensePlate}, function(err){
    if (err) throw err;

    callback(true);
  })
}
