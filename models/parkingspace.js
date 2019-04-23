var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// The divesite db model
var ParkingSpaceSchema = new Schema({
  occupied:{type: Boolean, default: false},
  location:{floor: String, direction: String},
  id:String
});

var ParkingSpace = module.exports = mongoose.model('parkingspaces', ParkingSpaceSchema);

module.exports.getFreeSpace = function(callback){
  ParkingSpace.findOne({occupied:false}, function(err, space){
    if (err) throw err;

    callback(space);
  });
}

module.exports.addParkingSpace = function(id, location, callback){
  ParkingSpace.findOne({id:id}, function(err, space){
    if (err) throw err;

    if (space){
      // Already exists
      callback(false);
    }
    else {
      var newSpace = new ParkingSpace();
      newSpace.id = id;
      newSpace.location = location;

      newSpace.save(function(err){
        if (err) throw err;

        callback(true);
      });
    }
  });
}

module.exports.updateParkingSpace = function(id, status, callback){
  ParkingSpace.findOne({id:id}, function(err, space){
    if (err) throw err;

    if (space){
      space.occupied = status;

      space.save(function(err){
        if (err) throw err;

        callback(true);
      });
    }
    else {
      callback(false);
    }
  });
}

module.exports.removeParkingSpace = function(id, callback){
  ParkingSpace.deleteOne({id:id}, function(err){
    if (err) throw err;

    callback(true);
  })
}
