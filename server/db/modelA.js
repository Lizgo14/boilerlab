const db = require('./db')
const Sequelize = require('sequelize')

const ModelA = db.define('modelA',{
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  }
})

module.exports = ModelA