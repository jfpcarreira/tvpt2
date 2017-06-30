const express   = require('express');
const app       = express();
const mongoose  = require('mongoose');
const env       = require('dotenv').config();
const utils     = require('./tools/utils');
const path      = require('path');

// Use native promises
mongoose.Promise = global.Promise;

// Connect to mongo DB Atlas
mongoose.connect(utils.getMongoUri(), function(err) {
    if (err) {
        console.log('Couldnt connect to database: ', err);
    }
    else {
        console.log('Successfully connected at mongo DB Atlas to database: ' + process.env.DB_NAME);
    }
});

app.use(express.static(__dirname + '/client/dist/'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.get('/', (req, res) => {
    res.send('hello João');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
})