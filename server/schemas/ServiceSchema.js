// Dependencies
const mongoose = require('mongoose');

// schema specification
const ServiceSchema = new mongoose.Schema({
    code        : { type: String,  required: true,  trim: true, maxlength:3, unique: true },
    name        : { type: String,  required: true,  trim: true },
    is_selected : { type: Boolean, default: false },
    is_disabled : { type: Boolean, default: false },
    price       : {
                     amount: Number,
                     currency: String,
                     symbol: String 
                   }
},
// Options
{
    timestamps: true
});

// Exports the schema to be reused on other schemas
module.exports = ServiceSchema;
