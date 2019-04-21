module.exports = function(app){
  var indexRouter = require('../routes/index');
  var dvlaRouter = require('../routes/dvla');
  var vehicleDbRouter = require('../routes/vehicledb');

  app.use('/', indexRouter);
  app.use('/dvla', dvlaRouter);
  app.use('/vehicledb', vehicleDbRouter);
}
