var mongoose = require('mongoose');

const uri = 'mongodb://user:password123@ds123981.mlab.com:23981/securing-nodejs';

mongoose.connect(uri);

/*
//Set up mongoose connection
mongoose.connect(uri);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
*/

