// Dependencies
var mongoose = require('mongoose');

// schema specification
var ServiceSchema = new mongoose.Schema({
    code         : { type : String,  required : true,  trim : true, maxlength: 3, index: { unique : true } },
    name         : { type : String,  required : true,  trim : true },
    is_selected  : { type : Boolean, required : true },
    is_disabled  : { type : Boolean, required : true },
    price        : {
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
