const { verifyToken } = require('../middleware/authJwt');
const controller = require('../controllers/cart.controller');

module.exports = (app) => {
  const router = require('express').Router();
  router.post('/', verifyToken, controller.addToCart);
  router.get('/', verifyToken, controller.getCart);
  router.put('/:productId', verifyToken, controller.updateCartById);
  router.delete('/:productId', verifyToken, controller.removeFromCart);
  router.delete('/', verifyToken, controller.clearCart);

  app.use('/api/cart', router);
};
