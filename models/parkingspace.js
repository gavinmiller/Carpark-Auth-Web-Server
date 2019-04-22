var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// The divesite db model
var ParkingSpaceSchema = new Schema({
  occupied:Boolean,
  location:String
});

var ParkingSpace = module.exports = mongoose.model('parkingspaces', ParkingSpaceSchema);

module.exports.getFreeSpace = function(callback){
  ParkingSpace.findOne({occupied:false}, function(err, space){
    if (err) throw err;

    if (space){
      callback(true);
    }
    else {
      callback(false);
    }
  });
}
