const { DataTypes } = require('sequelize')

const sequelize = require('../lib/sequelize')

const { Business } = require('../models/business')
const { Review } = require('../models/review')
const { Photo } = require('../models/photo')

const bcrypt = require('bcryptjs')

const User = sequelize.define('user', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { 
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 10))
    }
  },
  admin: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false }
})

User.hasMany(Business, { foreignKey: 'ownerId' })
Business.belongsTo(User, { foreignKey: 'ownerId' })

User.hasMany(Photo, { foreignKey: { allowNull: false } })
Photo.belongsTo(User)  

User.hasMany(Review, { foreignKey: { allowNull: false } })
Review.belongsTo(User)  

exports.User = User

exports.UserClientFields = [
  "name",
  "email",
  "password",
  "admin"
] 
