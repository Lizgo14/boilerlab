const Sequelize = require('sequelize')

//reads database url from environment if availible
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/boiler', {
  logging: false
})

module.exports = db