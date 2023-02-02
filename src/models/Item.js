const { DataTypes } = require("sequelize");
const { sequelize } = require('../db.js');
const { Playlist } = require('./PlayLists.js')

const Item = sequelize.define('item', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
     type: DataTypes.STRING,
     allowNull: false
    }
})

Playlist.hasMany(Item, { foreignKey: 'playlistId' });
Item.belongsTo(Playlist, { foreignKey: 'playlistId' });

module.exports = { Item }