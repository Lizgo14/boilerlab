const {db} = require('./server/db/index')
const app = require('./server/index')


const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!

db.sync()
  .then(function() {
    app.listen(port, function () {
      console.log(`Listening on port ${port}`);
    });
  })


