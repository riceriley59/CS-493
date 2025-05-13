/*
 * API sub-router for businesses collection endpoints.
 */
const { Router } = require('express')

const { validateAgainstSchema } = require('../lib/validation')
const { getChannel } = require('../lib/rabbit')

const {
    PhotoSchema,
    insertNewPhoto,
    getPhotoById
} = require('../models/photo')

const router = Router()

const imageTypes = {
  "image/jpeg": "jpg",
  "image/png": "png"
}

const crypto = require('crypto')
const path = require('path')
const fs = require('fs')

const multer = require('multer')
const upload = multer({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', 'uploads'),
    filename: (req, file, callback) => {
      const filename = crypto.pseudoRandomBytes(16).toString("hex")
      const extension = imageTypes[file.mimetype]
      callback(null, `${filename}.${extension}`)
    }, 
  }),
  fileFilter: (req, file, callback) => {
    callback(null, !!imageTypes[file.mimetype])
  }
})

/*
 * POST /photos - Route to create a new photo.
 */
router.post('/', upload.single('file'), async (req, res, next) => {
    if (req.file && validateAgainstSchema(req.body, PhotoSchema)) {
        try {
            const id = await insertNewPhoto({
              ...req.body,
              filename: req.file.filename,
              path: req.file.path,
              url: `/media/photos/${req.file.filename}`,
              contentType: req.file.mimetype
            })

            if (!id) { 
              fs.unlink(req.file.path, err => {
                if (err) {
                  console.error(`Error deleting file ${req.file.path}`)
                }
              })
              
              return res.status(400).send({
                error: "The businessId you provided is invalid or doesn't exist..." 
              })
            }

            const channel = getChannel() 
            channel.sendToQueue('images', Buffer.from(id.toString()))

            res.status(201).send({
                id: id
            })
        } catch (err) {
            next(err)
        }
    } else {
        res.status(400).send({
            error: "Request body or photo provided is not valid"
        })
    }
})

/*
 * GET /photos/{id} - Route to fetch info about a specific photo.
 */
router.get('/:id', async (req, res, next) => {
    try {
        const photo = await getPhotoById(req.params.id)
        if (photo) {
            delete photo.path
            delete photo.thumbPath
            res.status(200).send(photo)
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router
