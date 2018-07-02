var mongoose = require('mongoose');

//mongoose.connect('mongodb://thecodeworm:password0123@ds123981.mlab.com:23981/securing-nodejs', { useMongoClient: true });

// The `useMongoClient` option is no longer necessary in mongoose 5.x, please remove it.
mongoose.connect('mongodb://thecodeworm:password0123@ds123981.mlab.com:23981/securing-nodejs');