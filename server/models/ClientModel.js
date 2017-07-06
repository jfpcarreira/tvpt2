// Dependencies
var restful = require('node-restful'),
    ClientSchema   = require('../schemas/ClientSchema');

// Exports the model
module.exports = restful.model('Client', ClientSchema);
