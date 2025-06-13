const config = require('./db.config');

module.exports = {
  development: {
    username: config.USER,
    password: config.PASSWORD,
    database: config.DB,
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    pool: config.pool,
  },
};
