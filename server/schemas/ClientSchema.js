// Dependencies
const mongoose = require('mongoose');
const random = require("randomstring");
const validators = require('./Validators');

// schema specification
const ClientSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true, validate: validators.nameValidator }
  , user_tvpt: { type: String, unique: true }
  , pass_tvpt: { type: String }
  , user_sogra: { type: String, required: true, trim: true, unique: true, lowercase: true, validate: validators.usernameValidator }
  , pass_sogra: { type: String, required: true, trim: true }
  , email: { type: String, required: true, trim: true, unique: true, lowercase: true, validate: validators.emailValidator }
  , address: { type: String, required: true, trim: true }
  //    address     			: [ AddressSchema ],
  , phone: { type: String, required: true, trim: true, validate: validators.phoneValidator }
  , services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]
  , registration_date: { type: Date, default: Date.now }
  , expiration_date: { type: Date, default: generateExpirationDate() }
  , is_active: { type: Boolean, default: true }
},
  // Options
  {
    timestamps: true
  });

function generateExpirationDate() {
  return new Date().setFullYear(new Date().getFullYear() + 1);
}

// Befora saving we define a random user and password
ClientSchema.pre('save', function (next) {
  this.user_tvpt = random.generate(10);
  this.pass_tvpt = random.generate(10);
  next();
});

ClientSchema.statics.findByName = function (name, cb) {
  return this.find({ _id: new RegExp(name, 'i') }, cb);
};

// Exports the schema to be reused on other schemas
module.exports = ClientSchema;
