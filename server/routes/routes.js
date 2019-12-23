const router = require('express').Router()
const modelARoutes = require('./modelARoutes')

//put specific routes off api here
router.use('/modelA', modelARoutes)

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router