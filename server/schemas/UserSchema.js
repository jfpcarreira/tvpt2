// Dependencies
const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
const validators = require('./Validators');

// Local varables
const enumRoles = ["STANDARD", "ADMIN"];

// schema specification
const UserSchema = new mongoose.Schema({
    name      : { type: String, required: true, trim: true, validate: validators.nameValidator }
  , email     : { type: String, required: true, trim: true, unique: true, lowercase: true, validate: validators.emailValidator }
  , username  : { type: String, required: true, trim: true, unique: true, lowercase: true, validate: validators.usernameValidator }
  , password  : { type: String, required: true, trim: true, validate: validators.passwordValidator }
  //    , roles       : [{ type: String, enum: enumRoles}]
},
  // Options
  {
    timestamps: true
  });

// Before any attempt to save, we first encrypt the password
UserSchema.pre('save', function (next) {
  if (!this.isModified('password'))
    return next();

  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};

// Exports the schema to be reused on other schemas
module.exports = UserSchema;
