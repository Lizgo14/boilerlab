const db = require('./db')
const ModelA = require('./modelA')
const ModelB = require('./modelB')


ModelB.belongsTo(ModelA, {as: 'associatedModel'})

module.exports= {
  db, ModelA, ModelB
}