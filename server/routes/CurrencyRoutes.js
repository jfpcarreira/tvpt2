const router    = require('express').Router();
const Currency  = require('../models/CurrencyModel');
const utils     = require('../../tools/utils');

// Get all services
router.get('/', (req, res) => {
  Currency.find({}, (err, currencies) => {
    if (err) {
      res.json(utils.getInsuccessResponse('Unexpected error. Please try again later.', err));
    }
    else if (!currencies) {
      res.json(utils.getInsuccessResponse('No currencies found'));
    }
    else {
      let msg = 'Query returned ' + currencies.length + ' service(s)';
      res.json(utils.getSuccessResponse(msg, currencies));
    }
  });
});

// Get service by ID
router.get('/:code', (req, res) => {
  Service.find({ code: req.params.code }, (err, currency) => {
    if (err) {
      res.json(utils.getInsuccessResponse('Unexpected error. Please try again later.', err));
    }
    else if (!currency) {
      res.json(utils.getInsuccessResponse('No currency found for ID ' + req.params.id));
    }
    else {
      let result = 'Query returned one currency for ID: ' + req.params.id;
      res.json(utils.getSuccessResponse(result, currency));
    }
  });
});

// Create a new service
router.post('/', (req, res) => {
  if (!req.body.code) {
    res.json(utils.getInsuccessResponse('You must provide a code'));
  }
  else if (!req.body.name) {
    res.json(utils.getInsuccessResponse('You must provide an name'));
  }
  else if (!req.body.symbol) {
    res.json(utils.getInsuccessResponse('You must provide a symbol'));
  }
  else {
    let currency = new Currency({
        code: req.body.code
      , name: req.body.name
      , symbol: req.body.symbol
    });

    currency.save((err) => {
      if (err) {
        // Erro originado pelo unique: true
        if (err.code == 11000) {
          res.json(utils.getInsuccessResponse('Code already in use'));
        }
        // TODO: Personalizar os erros do currency
        // Erros especificos
        else if (err.errors) {
          if (err.errors.email) {
            res.json(utils.getInsuccessResponse(err.errors.email.message));
          }
          else if (err.errors.username) {
            res.json(utils.getInsuccessResponse(err.errors.username.message));
          }
          else {
            res.json(utils.getInsuccessResponse('Could not save currency. Try again later.', err));
          }
        }
        // Outros erros
        else {
          res.json(utils.getInsuccessResponse('Could not save currency. Try again later.', err));
        }
      }
      // Sucesso
      else {
        res.json(utils.getSuccessResponse('Currency successfully created!'));
      }
    });
  }
});

module.exports = router;