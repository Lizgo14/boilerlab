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

const userNotFound = next => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
}

router.get('/me', (req,res,next) => {
  if (!req.session.userId){
    userNotFound(next)
  } else{
    const user = ModelA.findById(req.session.userId)
    res.json(user)
  }
})

router.post('/signup', async(req, res, next) => {
   try{
     await ModelA.create(req.body)
  } catch (error){
    next(error)
  }
})

router.put('/login', async (req, res, next) => {
  try{
    const user = await ModelA.findOne({
      where: {
        username: req.body.username
      }
    })

    if (!user){
      res.status(401).send("Not a valid username")
    } else if(!user.correctPassword(req.body.password)){
      res.status(401).send("Incorrect Password")
    } else{
      req.login(user, error => {
        if(error){
          next(error)
        } else{
          res.json(user)
        }
      })
    }
  } catch (error){
    next(error)
  }
})

router.delete('/logout', (req,res,next)=>{
  req.logout()
  req.session.destroy()
  res.status(204).end()
})



module.exports = router