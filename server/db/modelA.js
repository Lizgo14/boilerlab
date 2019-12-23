const db = require('./db')
const Sequelize = require('sequelize')

const ModelA = db.define('modelA',{
  column1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  column2: {
    type: Sequelize.INTEGER
  }
})

module.exports = ModelA