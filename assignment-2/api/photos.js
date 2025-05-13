const router = require('express').Router()
const { ValidationError, ForeignKeyConstraintError } = require('sequelize')

const Photo = require('../models/photo')

exports.router = router

/*
 * Route to create a new photo.
 */
router.post('/', async (req, res, next) => {
  try {
    const photo = await Photo.create(req.body, [
      'userid',
      'businessId',
      'caption'
    ])

    console.log(photo.toJSON())

    res.status(201).send({
      id: photo.id
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
 * Route to fetch info about a specific photo.
 */
router.get('/:photoID', async (req, res, next) => {
  const photoID = parseInt(req.params.photoID)

  const photo = await Photo.findAll({ 
    where: { id: photoID }
  })

  if (photo.length > 0) {
    res.status(200).send(photo)
  } else {
    next()
  }
})

/*
 * Route to update a photo.
 */
router.put('/:photoID', async (req, res, next) => {
  try {
    const photoID = parseInt(req.params.photoID)

    const result = await Photo.update(req.body, {
      where: { id: photoID },
      fields: [
        'userid',
        'businessId',
        'caption'
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
 * Route to delete a photo.
 */
router.delete('/:photoID', async (req, res, next) => {
  const photoID = parseInt(req.params.photoID)

  const result = await Photo.destroy({ where: { id: photoID } })

  if (result > 0) {
    res.status(204).send()
  } else {
    next()
  }
})
