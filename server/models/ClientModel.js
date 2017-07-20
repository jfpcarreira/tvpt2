// Dependencies
const mongoose      = require('mongoose');
const ClientSchema  = require('../schemas/ClientSchema');

// Exports the model
module.exports = mongoose.model('Client', ClientSchema);
