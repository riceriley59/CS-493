const { Router } = require('express')

const businessRouter = require('./businesses')
const photosRouter = require('./photos')

const router = Router()

router.use('/businesses', businessRouter)
router.use('/photos', photosRouter)

module.exports = router
