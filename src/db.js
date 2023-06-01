const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
   process.env.POSTGRES_STRING,
  {
    logging: false,
    native: false,
  }
);

module.exports = { sequelize };
