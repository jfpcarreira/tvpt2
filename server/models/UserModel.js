// Dependencies
const mongoose    = require('mongoose');
const UserSchema  = require('../schemas/UserSchema');

// Exports the model
module.exports = mongoose.model('User', UserSchema);
