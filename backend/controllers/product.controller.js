const db = require('../models');
const Product = db.product;

exports.create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  const { name, category, page = 1 } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;
  let condition = {};
  if (name) condition.name = { [db.Sequelize.Op.iLike]: `%${name}%` };
  const products = await Product.findAndCountAll({
    where: condition,
    limit,
    offset,
  });
  res.json(products);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const updated = await Product.update(req.body, { where: { id } });
  if (updated[0]) res.json({ message: 'Product updated' });
  else res.status(404).json({ message: 'Product not found' });
};

exports.delete = async (req, res) => {
  const deleted = await Product.destroy({ where: { id: req.params.id } });
  if (deleted) res.json({ message: 'Product deleted' });
  else res.status(404).json({ message: 'Product not found' });
};
