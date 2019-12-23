const router = require('express').Router()
const {ModelA} = require('../db/index')

router.get('', async(req,res,next) => {
  try{
    const all = await ModelA.findAll()
    res.json(all)
  }catch(error){
    next(error)
  }
})

module.exports = router