const { DataTypes } = require("sequelize");
const { sequelize } = require('../db.js');

const Product = sequelize.define("product",{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
     },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    images:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    });

module.exports = {Product}