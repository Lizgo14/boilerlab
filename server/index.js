const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {db, ModelA, ModelB} = require('./db/index')
const port = 3000; // this can be very useful if you deploy to Heroku!process.env.PORT ||
const session = require('express-session')
const SequelizeStore= require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore(db)
const passport = require('passport')


//makes Mocha quit after tests
if(process.env.NODE_ENV === 'test'){
  after('close dbStore', () => dbStore.stopExpiringSessions())
}

if(process.env.NODE_ENV !== 'production'){
  require('./auth/secrets')
}

passport.serializeUser((user,done) =>{
  try{
    done(null,user.id)
  }catch (error){
    done(error)
  }
})

passport.deserializeUser( async (id, done) => {
  try{
    const user = await ModelA.findById(id)
    done(null, user)
  } catch (error){
    done(error)
  }
})

function createApp(){
//Logging middleware
app.use(morgan('dev'))

//Body Parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  store: dbStore,
  secret: process.env.SESSION_SECRET || 'insecure secret',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', require('./routes/routes.js')); // matches all requests to /api
app.use('/auth', require('./auth/index'))

//static serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

//404 Error Message
app.use((req,res,next) => {
  if(path.extname(req.path).length) {
  const error = new Error("Not found!")
  error.status =404
  next(error)
  }else{
    next()
  }
})

//sends index.html
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})


app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
}

async function startApp() {
  await dbStore.sync()
  await db.sync()
  createApp()
  app.listen(port, function () {
    console.log(`Listening on port ${port}`);
  })
}

if(require.main === module){
  startApp()
}else{
  createApp()
}

module.exports = app