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

const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

module.exports = app