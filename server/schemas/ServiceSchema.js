// Dependencies
const mongoose = require('mongoose');

// schema specification
const ServiceSchema = new mongoose.Schema({
    code:         { type: String, required: true, trim: true, maxlength: 3, unique: true }
  , name:         { type: String, required: true, trim: true }
  , price:        { type: Number, required: true }
  , currency:     { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' }
  , is_selected:  { type: Boolean, default: false }
  , is_disabled:  { type: Boolean, default: false }
},
// Options
{
  timestamps: true
});

// Exports the schema to be reused on other schemas
module.exports = ServiceSchema;
