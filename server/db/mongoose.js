const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_ORANGE_URI || 'mongodb://localhost/Todos');
mongoose.Promise = global.Promise;

module.exports = { mongoose }
