const dbUrl = "mongodb://localhost/vehicleauth"; // The URL of the db

module.exports = function(mongoose){
    mongoose.connect(
      dbUrl,
      {useNewUrlParser: true}
    );

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
