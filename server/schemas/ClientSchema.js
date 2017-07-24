// Dependencies
const mongoose    = require('mongoose');
const random      = require("randomstring");
const validators  = require('./Validators');

// schema specification
var ClientSchema = new mongoose.Schema({
      name              : { type: String, trim: true, required: true, validate: validators.nameValidator }
    , user_tvpt         : { type: String, unique: true }
    , pass_tvpt         : { type: String }
    , user_sogra        : { type: String, required: true, trim: true, unique: true, lowercase: true, validate: validators.usernameValidator }
    , pass_sogra        : { type: String, required: true, trim: true }
    , email             : { type: String, required: true, trim: true, unique: true, lowercase: true, validate: validators.emailValidator }
    , address           : { type: String, required: true, trim: true }
    //    address     			: [ AddressSchema ],
    , phone             : { type: String, required: true, trim: true, validate: validators.phoneValidator }
    , services          : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Service' }]
    , registration_date : { type: Date, default: Date.now }
    , expiration_date   : { type: Date, default: generateExpirationDate() }
    , is_active         : { type: Boolean, default: true }
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
    console.log('Entrei no pre');
    console.log('user tvpt antes: ' + this.user_tvpt);
    console.log('pass tvpt antes: ' + this.pass_tvpt);
    
    this.user_tvpt = random.generate(10);
    this.pass_tvpt = random.generate(10);

    console.log('user tvpt depois: ' + this.user_tvpt);
    console.log('pass tvpt depois: ' + this.pass_tvpt);

    console.log('user sogra: ' + this.user_sogra);
    console.log('email: ' + this.email);

    next();
});

// Exports the schema to be reused on other schemas
module.exports = ClientSchema;
