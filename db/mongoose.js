'use strict'

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo:27017/OpenIDP', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {mongoose};
