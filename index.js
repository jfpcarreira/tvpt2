const express       = require('express');
const app           = express();
const router        = express.Router();
const mongoose      = require('mongoose');
const env           = require('dotenv').config();
const utils         = require('./tools/utils');
const path          = require('path');
const bodyParser    = require('body-parser');
const cors          = require('cors');

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

// Middleware
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', require('./server/routes/Authentication')(router) );

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
})