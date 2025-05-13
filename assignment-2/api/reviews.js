const router = require('express').Router()
const { ValidationError, ForeignKeyConstraintError } = require('sequelize')

const Review = require('../models/review')

exports.router = router

/*
 * Route to create a new review.
 */
router.post('/', async (req, res, next) => {
  try {
    const review = await Review.create(req.body, [
      'userid',
      'businessId',
      'dollars',
      'stars',
      'reviews'
    ]) 

    console.log(review.toJSON())

    res.status(201).send({
      id: review.id
    })

  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(400).send({
        err: e.message
      }) 
    } else if (e instanceof ForeignKeyConstraintError) {
      res.status(400).send({
        err: `Invalid BusinessId provided: ${req.body.businessId}. That business does not exist.`
      })
    } else {
      throw e
    }
  }
})

/*
 * Route to fetch info about a specific review.
 */
router.get('/:reviewID', async (req, res, next) => {
  const reviewID = parseInt(req.params.reviewID)

  const review  = await Review.findAll({
    where: { id: reviewID }
  })

  if (review.length > 0) {
    res.status(200).send(review)
  } else {
    next()
  }
})

/*
 * Route to update a review.
 */
router.put('/:reviewID', async (req, res, next) => {
  try {
    const reviewID = parseInt(req.params.reviewID)

    const result = await Review.update(req.body, {
      where: { id: reviewID },
      fields: [
        'userid',
        'businessId',
        'dollars',
        'stars',
        'reviews'
      ] 
    })

    if (result[0] > 0) {
      res.status(204).send()
    } else {
      next()
    }
  } catch (e) {
    if (e instanceof ForeignKeyConstraintError) {
      res.status(400).send({
        err: `Invalid BusinessId provided: ${req.body.businessId}. That business does not exist.`
      })
    } else {
      throw e
    }
  }
})

/*
 * Route to delete a review.
 */
router.delete('/:reviewID', async (req, res, next) => {
  const reviewID = parseInt(req.params.reviewID)

  const result = await Review.destroy({ where: { id: reviewID } })

  if (result > 0) {
    res.status(204).send()
  } else {
    next()
  }
})
