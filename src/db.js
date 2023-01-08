const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:bYPN3cpokAxQUDv@my-db.internal:5432', {
  logging: false,
  native: false
});

module.exports =  {sequelize} 
