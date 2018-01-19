const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_ORANGE_URI);
mongoose.Promise = global.Promise;

module.exports = { mongoose }
