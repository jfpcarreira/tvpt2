// Dependencies
var mongoose        = require('mongoose'),
    random          = require("randomstring");

// Local varables
var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var phoneRegex = /^[\+1]{0,2}?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

// schema specification
var ClientSchema = new mongoose.Schema({
    name:               { type: String, trim: true, required: true },
    username:           { type: String, trim: true, index: { unique: true } },
    password:           { type: String, trim: true },
    user_sogra:         { type: String, trim: true, required: true },
    pass_sogra:         { type: String, trim: true, required: true },
    email:              { type: String, trim: true, lowercase: true, required: true, match: emailRegex },
    address:            { type: String, trim: true, required: true },
    //    address     			: [ AddressSchema ],
    phone:              { type: String, trim: true, required: true, match: phoneRegex },
    services:           [{ type : mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    registration_date:  { type: Date, default: Date.now, required: true },
    expiration_date:    { type: Date, default: generateExpirationDate(), required: true },
    is_active:          { type: Boolean, default: true }
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
    this.username = random.generate(10);
    this.password = random.generate(10);
    next();
});

// Exports the schema to be reused on other schemas
module.exports = ClientSchema;
