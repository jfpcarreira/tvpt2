// Dependencies
const mongoose      = require('mongoose');
const ServiceSchema = require('../schemas/ServiceSchema');

// Exports the model
module.exports = mongoose.model('Service', ServiceSchema);
