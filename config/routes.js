module.exports = function(app){
  var dvlaRouter = require('../routes/dvla');
  var vehicleDbRouter = require('../routes/vehicledb');

  app.use('/dvla', dvlaRouter);
  app.use('/vehicledb', vehicleDbRouter);
}
