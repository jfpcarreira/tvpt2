// Dependencies
const mongoose = require('mongoose');

// schema specification
const CurrencySchema = new mongoose.Schema({
    code    : { type: String,  required: true,  trim: true, maxlength:3, unique: true },
    name    : { type: String,  required: true,  trim: true },
    symbol  : { type: String,  required: true }
},
// Options
{
    timestamps: true
});

// Exports the schema to be reused on other schemas
module.exports = CurrencySchema;
