const db = require('../models');
const Cart = db.cart;

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  await Cart.create({ userId: req.userId, productId, quantity });
  res.status(201).send({ message: 'Added to cart' });
};

exports.getCart = async (req, res) => {
  const items = await Cart.findAll({ where: { userId: req.userId } });
  res.json(items);
};

exports.removeFromCart = async (req, res) => {
  await Cart.destroy({
    where: { userId: req.userId, productId: req.params.productId },
  });
  res.send({ message: 'Removed from cart' });
};
