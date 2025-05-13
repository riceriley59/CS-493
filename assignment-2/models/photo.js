const { DataTypes } = require("sequelize")

const sequelize = require('../sequelize')

const Photo = sequelize.define('photo', {
  userid: { type: DataTypes.INTEGER, allowNull: false },
  caption: { type: DataTypes.TEXT, allowNull: true }
})

module.exports = Photo