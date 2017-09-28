const express     = require('express');
const app         = express();
const mongoose    = require('mongoose');
const env         = require('dotenv').config();
const utils       = require('./tools/utils');
const path        = require('path');
const bodyParser  = require('body-parser');
const cors        = require('cors');

// Use native promises
mongoose.Promise = global.Promise;

// Connect to mongo DB Atlas
mongoose.connect(utils.getMongoUri(), {
  useMongoClient: true
}).then(function (db) {
  console.log('Successfully connected to mongo DB Atlas in database: ' + process.env.DB_NAME);
}).catch(function (err) {
  console.log('Couldnt connect to database: ', err);
});

// Middleware
app.use(cors({
  origin: process.env.CORS_FRONTEND_URL
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.enable('strict routing');

app.use('/api', require('./server/routes'));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
