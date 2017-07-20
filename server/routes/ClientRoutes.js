const Client = require('../models/ClientModel');
const utils = require('../../tools/utils')

module.exports = (router) => {

  // Get all clients
  router.get('/', (req, res) => {
    Client.find({}, (err, clients) => {
      if (err) {
        res.json(utils.getInsuccessResponse(err));
      }
      else if (!clients) {
        res.json(utils.getInsuccessResponse('No clients found'));
      }
      else {
        let results = 'Query returned ' + clients.length + ' client(s)';
        let teste = `Query returned ${clients.length} client(s)`;
        console.log(teste);
        res.json(utils.getSuccessResponse(results, clients));
      }
    });
  });

  // Get client by ID
  router.get('/:id', (req, res) => {
    Client.find({_id: req.params.id}, (err, client) => {
      if (err) {
        res.json(utils.getInsuccessResponse(err));
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
    else if (!req.body.userSogra) {
      res.json(utils.getInsuccessResponse('You must provide an username'));
    }
    else if (!req.body.passSogra) {
      res.json(utils.getInsuccessResponse('You must provide a password'));
    }
    else {
      let client = new Client({
          name: req.body.name
        , email: req.body.email
        , address: req.body.address
        , phone: req.body.phone
        , user_sogra: req.body.userSogra
        , pass_sogra: req.body.passSogra
        , registration_date: req.body.regDate
      });

      client.save((err) => {
        if (err) {
          console.log(err);
          // Erro originado pelo unique: true
          if (err.code == 11000) {
            res.json(utils.getInsuccessResponse('Username or email already in use'));
          }
          // TODO: Personalizar os erros do cliente
          // Erros especificos
          else if (err.errors) {
            if (err.errors.email) {
              res.json(utils.getInsuccessResponse(err.errors.email.message));
            }
            else if (err.errors.username) {
              res.json(utils.getInsuccessResponse(err.errors.username.message));
            }
            else {
              res.json(utils.getInsuccessResponse('Could not save user. Error: ' + err));
            }
          }
          // Outros erros
          else {
            res.json(utils.getInsuccessResponse('Could not save user. Error: ' + err));
          }
        }
        // Sucesso
        else {
          res.json(utils.getSuccessResponse('User successfully registered!'));
        }
      });
    }
  });

  return router;
}
