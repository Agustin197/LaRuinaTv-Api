const { DataTypes } = require("sequelize");
const { sequelize } = require('../db.js');

const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true
    }
});

module.exports = {User}
