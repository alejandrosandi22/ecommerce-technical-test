const db = require('../models');
const Cart = db.cart;

exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.userId;

  try {
    const [item, created] = await Cart.findOrCreate({
      where: { userId, productId },
      defaults: { quantity: 1 },
    });

    if (!created) {
      return res.status(200).send({ message: 'Item already exists in cart' });
    }

    return res.status(201).send({ message: 'Item added to cart' });
  } catch (error) {
    console.error('ERROR EN addToCart:', error);
    return res.status(500).send({ message: 'Server error' });
  }
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

exports.clearCart = async (req, res) => {
  await Cart.destroy({
    where: { userId: req.userId },
  });
  res.send({ message: 'Cart cleared' });
};

exports.updateCartById = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const cartItem = await Cart.findOne({
      where: { userId: req.userId, productId },
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (quantity <= 0) {
      await cartItem.destroy();
      return res.json({ message: 'Item removed from cart' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({ message: 'Cart updated', item: cartItem });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
