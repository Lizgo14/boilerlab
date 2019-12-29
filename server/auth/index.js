const router = require('express').Router()
const googleRouter = require('./google')
const localRouter = require('./secrets')

router.use('/google', googleRouter)
router.use('/secrets', localRouter)

module.exports = router