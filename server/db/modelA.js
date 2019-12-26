const db = require('./db')
const Sequelize = require('sequelize')
const crypto = require('crypto')

const ModelA = db.define('modelA',{
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING
    }
  }, {
    hooks:{
      beforeCreate: setSaltPassword,
      beforeUpdate: setSaltPassword
    }
  })


ModelA.prototype.correctPassword = function(password){
  return this.Model.encryptPassword(password,this.salt) === this.password
}

User.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt']);
}


ModelA.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}


ModelA.encryptPassword = function (plainText, salt) {
  const hash = crypto.createHash('sha1')
  hash.update(plainText)
  hash.update(salt)
  return hash.digest
}


function setSaltAndPassword (user){
  if (user.changed('password')){
    user.salt= ModelA.generateSalt()
    user.password = ModelA.encryptPassword(user.password, user.salt)
  }
}
module.exports = ModelA