const { DataTypes } = require("sequelize");
const { sequelize } = require('../db.js');
const { User } = require('./User.js')

const Playlist = sequelize.define('playlist', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Playlist.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Playlist, { foreignKey: 'userId' });

module.exports = { Playlist }
