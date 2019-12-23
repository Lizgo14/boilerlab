const db = require('./db')
const Sequelize = require('sequelize')

const ModelB = db.define('modelB',{
  column1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  modelA: {
    type: Sequelize.INTEGER
  }
})

module.exports = ModelB