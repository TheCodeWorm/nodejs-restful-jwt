var mongoose = require('mongoose');

// database username: user
// database password: password123
const uri = 'mongodb://user:password123@ds123981.mlab.com:23981/securing-nodejs';

mongoose.connect(uri);
