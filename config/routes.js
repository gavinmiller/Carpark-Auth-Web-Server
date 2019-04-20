module.exports = function(app){
  // // Declaring/assigning routers
  // var indexRouter = require('../routes/index');
  // var loginRouter = require('../routes/login');
  // var profileRouter = require('../routes/profile');
  //
  // // Redirecting certain path requests to the desired routes
  // app.use('/', indexRouter);
  // app.use('/login', loginRouter);
  // app.use('/profile', profileRouter);
  var dvlaRouter = require('../routes/dvla');
  var getVehicleRouter = require('../routes/getvehicle');

  app.use('/dvla', dvlaRouter);
  app.use('/getvehicle', getVehicleRouter);
}
