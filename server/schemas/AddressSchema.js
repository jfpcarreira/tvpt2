// Dependencies
var mongoose = require('mongoose');

// schema specification
var AddressSchema = new mongoose.Schema({
    number      : { type : String, trim : true, required : true },
    street      : { type : String, trim : true, required : true },
    postalCode  : { type : String, trim : true, required : true },
    city        : { type : String, trim : true, required : true },
    country     : { type : String, trim : true, required : true, default : "Canada"}
},
// Options
{
    _id: false
});

// Exports the schema to be reused on other schemas
module.exports = AddressSchema;
