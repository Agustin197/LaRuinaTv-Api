const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  // 'postgres://postgres:123321@localhost:5432/laruina',
  "postgres://postgres:dekajcZ0ufGVR8I@la-ruina-api-db.internal:5432",
  {
    logging: false,
    native: false,
  }
);

module.exports = { sequelize };
