// Dependencies
var restful         = require('node-restful'),
    ServiceSchema   = require('../schemas/ServiceSchema');

// Exports the model
module.exports = restful.model('Service', ServiceSchema);
