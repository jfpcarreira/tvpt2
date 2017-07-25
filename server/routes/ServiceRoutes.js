const Service = require('../models/ServiceModel');
const utils = require('../../tools/utils')

module.exports = (router) => {

  // Get all services
  router.get('/', (req, res) => {
    Service.find({}, (err, services) => {
      if (err) {
        res.json(utils.getInsuccessResponse('Unexpected error. Please try again later.', err));
      }
      else if (!services) {
        res.json(utils.getInsuccessResponse('No services found'));
      }
      else {
        let msg = 'Query returned ' + services.length + ' service(s)';
        res.json(utils.getSuccessResponse(msg, services));
      }
    });
  });

  // Get service by ID
  router.get('/:id', (req, res) => {
    Service.find({_id: req.params.id}, (err, service) => {
      if (err) {
        res.json(utils.getInsuccessResponse('Unexpected error. Please try again later.', err));
      }
      else if (!service) {
        res.json(utils.getInsuccessResponse('No service found for ID ' + req.params.id));
      }
      else {
        let result = 'Query returned one service for ID: ' + req.params.id;
        res.json(utils.getSuccessResponse(result, service));
      }
    });
  });

  // Create a new client
  router.post('/', (req, res) => {
    if (!req.body.code) {
      res.json(utils.getInsuccessResponse('You must provide a code'));
    }
    else if (!req.body.name) {
      res.json(utils.getInsuccessResponse('You must provide an name'));
    }
    else if (!req.body.price) {
      res.json(utils.getInsuccessResponse('You must provide a price'));
    }
    else {
      let service = new Service({
          code: req.body.code
        , name: req.body.name
        , is_selected: req.body.is_selected
        , is_disabled: req.body.is_disabled
        , price: req.body.price
      });

      service.save((err) => {
        if (err) {
          // Erro originado pelo unique: true
          if (err.code == 11000) {
            res.json(utils.getInsuccessResponse('Code already in use'));
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
              res.json(utils.getInsuccessResponse('Could not save service. Try again later.', err));
            }
          }
          // Outros erros
          else {
            res.json(utils.getInsuccessResponse('Could not save service. Try again later.', err));
          }
        }
        // Sucesso
        else {
          res.json(utils.getSuccessResponse('Service successfully created!'));
        }
      });
    }
  });

  return router;
}
