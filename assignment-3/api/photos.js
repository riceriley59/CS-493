const { Router } = require('express')
const { ValidationError } = require('sequelize')

const { Photo, PhotoClientFields } = require('../models/photo')

const { requireAuthentication } = require('../lib/auth')

const router = Router()

/*
 * Route to create a new photo.
 */
router.post('/', requireAuthentication, async function (req, res, next) {
  const userId = parseInt(req.body.userId)

  if (userId != null && req.user !== userId && !req.admin) {
    return res.status(403).send({
      error: "Unauthorized to create the requested resource."
    })
  }

  try {
    const photo = await Photo.create(req.body, PhotoClientFields)
    res.status(201).send({ id: photo.id })
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(400).send({ error: e.message })
    } else {
      next(e)
    }
  }
})

/*
 * Route to fetch info about a specific photo.
 */
router.get('/:photoId', async function (req, res, next) {
  const photoId = parseInt(req.params.photoId)

  try {
    const photo = await Photo.findByPk(photoId)
    if (photo) {
      res.status(200).send(photo)
    } else {
      next()
    }
  } catch (e) {
    next(e)
  }
})

/*
 * Route to update a photo.
 */
router.patch('/:photoId', requireAuthentication, async function (req, res, next) {
  const photoId = parseInt(req.params.photoId)

  const photo = await Photo.findByPk(photoId)
  if (photo && req.user !== photo.userId && !req.admin) {
    return res.status(403).send({
      error: "Unauthorized to modify this resource"
    })
  }

  try {
    /*
     * Update photo without allowing client to update businessId or userId.
     */
    const result = await Photo.update(req.body, {
      where: { id: photoId },
      fields: PhotoClientFields.filter(
        field => field !== 'businessId' && field !== 'userId'
      )
    })
    if (result[0] > 0) {
      res.status(204).send()
    } else {
      next()
    }
  } catch (e) {
    next(e)
  }
})

/*
 * Route to delete a photo.
 */
router.delete('/:photoId', requireAuthentication, async function (req, res, next) {
  const photoId = parseInt(req.params.photoId)

  const photo = await Photo.findByPk(photoId)
  if (photo && req.user !== photo.userId && !req.admin) {
    return res.status(403).send({
      error: "Unauthorized to modify this resource"
    })
  }

  try {
    const result = await Photo.destroy({ where: { id: photoId }})
    if (result > 0) {
      res.status(204).send()
    } else {
      next()
    }
  } catch (e) {
    next(e)
  }
})

module.exports = router
