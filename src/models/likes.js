const { DataTypes } = require("sequelize");
const { sequelize } = require('../db.js');
const { User } = require('./User.js')

const Likes = sequelize.define('likes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    urlId:{
      type: DataTypes.STRING,
      allowNull: false
    },
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
})

Likes.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Likes, { foreignKey: 'userId' });

module.exports = { Likes }
