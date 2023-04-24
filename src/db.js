const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
   "postgres://postgres:rGsgb5JFeBBwx9U@terminalkiller-db.internal:5432",
  {
    logging: false,
    native: false,
  }
);

module.exports = { sequelize };
