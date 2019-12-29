const passport = require('passport')
const router = require('express').Router()
const {ModelA} = require('../db/index.js')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

if(process.env.NODE_ENV === 'development'){
  require('./secrets')
}

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clinetSecrete: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}

const strategy = new GoogleStrategy(googleConfig,   async function(token, refreshToken, profile, done){
  const googleId = profile.id
  const name = profile.displayName
  const email = profile.emails[0].value

  try{
    const user = await ModelA.findOne({where:{ googleId: googleId} })

    if(!user){
     await ModelA.create({name, email, googleId})
    }
    done(null, user)
  } catch(done){  
  }
})

passport.use(strategy)

router.get('/auth/google', passport.authenticate('google', {scope: email}))

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect:'/',
  failureRedirect:'/login'
}))

module.exports = router