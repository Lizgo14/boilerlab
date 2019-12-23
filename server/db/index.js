const db = require('./db')
const ModelA = require('./modelA')
const ModelB = require('./modelB')


ModelB.belongsTo(ModelA, {as: 'modelA'})

module.exports= {
  db, ModelA, ModelB
}