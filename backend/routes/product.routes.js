const { verifyToken, isAdmin } = require('../middleware/authJwt');
const controller = require('../controllers/product.controller');

module.exports = (app) => {
  const router = require('express').Router();

  router.get('/', controller.findAll);
  router.post('/', [verifyToken, isAdmin], controller.create);
  router.put('/:id', [verifyToken, isAdmin], controller.update);
  router.delete('/:id', [verifyToken, isAdmin], controller.delete);

  app.use('/api/products', router);
};
