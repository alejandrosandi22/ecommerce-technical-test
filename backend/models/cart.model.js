module.exports = (sequelize, DataTypes) => {
  return sequelize.define('cart', {
    userId: { type: DataTypes.INTEGER },
    productId: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  });
};
