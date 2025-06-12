const config = require('../config/db.config.js');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: config.pool,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./user.model.js')(sequelize, DataTypes);
db.product = require('./product.model.js')(sequelize, DataTypes);
db.cart = require('./cart.model.js')(sequelize, DataTypes);

module.exports = db;
