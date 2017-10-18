const router  = require('express').Router();
const utils   = require('../../tools/utils')

router.use('/authentication', require('./Authentication'));
router.use('/currency',       require('./CurrencyRoutes'));
router.use('/service',        require('./ServiceRoutes'));
router.use('/client',         require('./ClientRoutes'));

router.use((req, res) => {
  res.json(utils.getInsuccessResponse('The API service you are trying to reach does not exist'));
});

module.exports = router;
