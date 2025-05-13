const { ValidationError, UniqueConstraintError } = require('sequelize')

const { Router } = require('express')

const { Business } = require('../models/business')
const { Photo } = require('../models/photo')
const { Review } = require('../models/review')
const { User, UserClientFields } = require('../models/user')

const { generateAuthToken, requireAuthentication, isAuthenticated } = require('../lib/auth')

const router = Router()

/*
 * Route to create a new user.
 */
router.post('/', async function (req, res, next) {
  try {
    if (typeof(req.body.admin) !== "boolean") {
      return res.status(400).send({
        error: "Admin field must be a boolean."
      })
    }

    if (req.body.admin && req.body.admin === true) {
      if (requireAuthentication(req, res)) return

      if (req.admin === true) {
        const user = await User.create(req.body, UserClientFields)
        res.status(201).send({ id: user.id })
      } else {
        res.status(403).send({
          error: "Unauthorized to create an admin account."
        })
      }
    } else {
      const user = await User.create(req.body, UserClientFields)
      res.status(201).send({ id: user.id })
    }
  } catch (e) {
    if(e instanceof UniqueConstraintError) {
      res.status(400).send({ error: "User with that email already exists." })
    } else if (e instanceof ValidationError) {
      res.status(400).send({ error: e.message })
    } else {
      next(e)
    }
  }
})

/* 
 * Route to login user.
 */
router.post('/login', async function (req, res, next) {
  const email = req.body.email
  const password = req.body.password

  try {
    const user = await User.findOne({ where: { email: email } })

    if (user && await isAuthenticated(password, user.password)) {
      const token = generateAuthToken(user.id, user.admin)
      res.status(200).send({ token: token })
    } else {
      res.status(401).send({
        error: "User doesn't exist or you provided incorrect credentials"
      })
    }
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(400).send({ error: e.message })
    } else {
      next(e)
    }
  }
})

/*
 * Route to fetch info about a specific user.
 */
router.get('/:userId', requireAuthentication, async function (req, res, next) {
  const userId = parseInt(req.params.userId)

  if (userId != null && req.user !== userId && !req.admin) {
    return res.status(403).send({
      error: "Unauthorized to access the specified resource"
    })
  }

  try {
    const user = await User.findByPk(userId, { attributes: {
      exclude: ['password']
    }})
    if (user) {
      res.status(200).send(user)
    } else {
      next()
    }
  } catch (e) {
    next(e)
  }
})

/*
 * Route to list all of a user's businesses.
 */
router.get('/:userId/businesses', requireAuthentication, async function (req, res) {
  const userId = parseInt(req.params.userId)

  if (userId != null && req.user !== userId && !req.admin) {
    console.log(req.user)
    return res.status(403).send({
      error: "Unauthorized to access the specified resource"
    })
  }

  try {
    const userBusinesses = await Business.findAll({ where: { ownerId: userId }})
    res.status(200).send({
      businesses: userBusinesses
    })
  } catch (e) {
    next(e)
  }
})

/*
 * Route to list all of a user's reviews.
 */
router.get('/:userId/reviews', requireAuthentication, async function (req, res) {
  const userId = parseInt(req.params.userId)
  
  if (userId != null && req.user !== userId && !req.admin) {
    return res.status(403).send({
      error: "Unauthorized to access the specified resource"
    })
  }

  try {
    const userReviews = await Review.findAll({ where: { userId: userId }})
    res.status(200).send({
      reviews: userReviews
    })
  } catch (e) {
    next(e)
  }
})

/*
 * Route to list all of a user's photos.
 */
router.get('/:userId/photos', requireAuthentication, async function (req, res) {
  const userId = parseInt(req.params.userId)

  if (userId != null && req.user !== userId && !req.admin) {
    return res.status(403).send({
      error: "Unauthorized to access the specified resource"
    })
  }

  try {
    const userPhotos = await Photo.findAll({ where: { userId: userId }})
    res.status(200).send({
      photos: userPhotos
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router
