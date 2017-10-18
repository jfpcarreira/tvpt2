const router  = require('express').Router();
const Client  = require('../models/ClientModel');
const utils   = require('../../tools/utils');

// Get all clients
router.get('/', (req, res) => {
  Client.find({}).populate('services').exec((err, clients) => {
    if (err) {
      res.json(utils.getInsuccessResponse('Unexpected error. Please try again later.', err));
    }
    else if (!clients) {
      res.json(utils.getInsuccessResponse('No clients found'));
    }
    else {
      let msg = 'Query returned ' + clients.length + ' client(s)';
      res.json(utils.getSuccessResponse(msg, clients));
    }
  });
});

// Get client by ID
router.get('/:id', (req, res) => {
  Client.findById({ _id: req.params.id}).populate('services').exec((err, client) => {
    if (err) {
      res.json(utils.getInsuccessResponse('Unexpected error. Please try again later.', err));
    }
    else if (!client) {
      res.json(utils.getInsuccessResponse('No client found for ID ' + req.params.id));
    }
    else {
      let result = 'Query returned one client for ID: ' + req.params.id;
      res.json(utils.getSuccessResponse(result, client));
    }
  });
});
 
// Create a new client
router.post('/', (req, res) => {
  if (!req.body.name) {
    res.json(utils.getInsuccessResponse('You must provide a name'));
  }
  else if (!req.body.email) {
    res.json(utils.getInsuccessResponse('You must provide an e-mail'));
  }
  else if (!req.body.user_sogra) {
    res.json(utils.getInsuccessResponse('You must provide an username'));
  }
  else if (!req.body.pass_sogra) {
    res.json(utils.getInsuccessResponse('You must provide a password'));
  }
  else {
    let client = new Client({
        name:               req.body.name
      , email:              req.body.email
      , address:            req.body.address
      , phone:              req.body.phone
      , user_sogra:         req.body.user_sogra
      , pass_sogra:         req.body.pass_sogra
      , registration_date:  req.body.registration_date
      , services:           utils.getIdsFromDbObject(req.body.services)
    });

    console.log(client);

    client.save((err) => {
      if (err) {
        // Erro originado pelo unique: true
        if (err.code == 11000) {
          res.json(utils.getInsuccessResponse('Username or email already in use'));
        }
        // TODO: Personalizar os erros do cliente
        // Erros especificos
        else if (err.errors) {
          console.log(err.errors);
          if (err.errors.email) {
            res.json(utils.getInsuccessResponse(err.errors.email.message));
          }
          else if (err.errors.username) {
            res.json(utils.getInsuccessResponse(err.errors.username.message));
          }
          else {
            res.json(utils.getInsuccessResponse('Could not save client. Try again later.', err));
          }
        }
        // Outros erros
        else {
          res.json(utils.getInsuccessResponse('Could not save client. Try again later.', err));
        }
      }
      // Sucesso
      else {
        res.json(utils.getSuccessResponse('Client successfully created!'));
      }
    });
  }
});

// Delete client by ID
router.delete('/:id', (req, res) => {
  Client.findByIdAndRemove({ _id: req.params.id}).exec((err, client) => {
    if (err) {
      res.json(utils.getInsuccessResponse('Unexpected error, client was not removed. Please try again later.', err));
    }
    else {
      res.json(utils.getSuccessResponse("Client successfuly removed!"));
    }
  });
});

module.exports = router;
