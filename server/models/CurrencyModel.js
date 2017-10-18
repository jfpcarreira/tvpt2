// Dependencies
const mongoose       = require('mongoose');
const CurrencySchema = require('../schemas/CurrencySchema');

// Exports the model
module.exports = mongoose.model('Currency', CurrencySchema);
