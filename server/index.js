const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')


//Logging middleware
app.use(morgan('dev'))

//Body Parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/api', require('./routes/routes.js')); // matches all requests to /api


app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});


module.exports = app