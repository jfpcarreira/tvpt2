const router  = require('express').Router();
const jwt     = require('jsonwebtoken');
const utils   = require('../../tools/utils')

// NO AUTHENTICATION REQUIRED ZONE
router.use('/authentication', require('./Authentication'));

// MIDDLEWARE TO VERIFY AUTHENTICATION
router.use((req, res, next) => {
  const token = req.headers['authorization'];

  if(!token) {
    // if there is no token return an error (Unauthorized)
    return res.status(401).send('No token provided');
  }
  else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) {
        if(err.name == 'TokenExpiredError') {
          res.json(utils.getInsuccessResponse('Token is expired', err));
        }
        else {
          res.json(utils.getInsuccessResponse('Token is invalid', err));
        }
      }
      else {
        req.decoded = decoded;
        next();
      }
    });
  }
});

// AUTHENTICATION REQUIRED ZONE
router.use('/currency',       require('./CurrencyRoutes'));
router.use('/service',        require('./ServiceRoutes'));
router.use('/client',         require('./ClientRoutes'));

// MIDDLEWARE TO PREVENT WRONG URL REQUEST
router.use((req, res) => {
  res.json(utils.getInsuccessResponse('The API service you are trying to reach does not exist'));
});

module.exports = router;
