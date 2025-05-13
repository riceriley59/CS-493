/*
 * Photo schema and data accessor methods.
 */

const { ObjectId } = require('mongodb')

const { getDb } = require('../lib/mongo')
const { extractValidFields } = require('../lib/validation')

/*
 * Schema describing required/optional fields of a photo object.
 */
const PhotoSchema = {
    businessId: { required: true },
    filename: { required: false },
    path: { required: false },
    contentType: { required: false },
    caption: { required: false },
    url: { required: false },
    thumbPath: { required: false },
    thumburl: { required: false }
}
exports.PhotoSchema = PhotoSchema

/*
 * Executes a DB query to insert a new photo into the database.  Returns
 * a Promise that resolves to the ID of the newly-created photo entry.
 */
async function insertNewPhoto(photo) {
    photo = extractValidFields(photo, PhotoSchema)

    if (!ObjectId.isValid(photo.businessId)) return null
    photo.businessId = new ObjectId(photo.businessId)

    const db = getDb()
    const photoCollection = db.collection('photos')

    const businessCollection = db.collection('businesses')
    const business = await businessCollection.findOne({ _id: photo.businessId })
    if (!business) return null

    const result = await photoCollection.insertOne(photo)
    return result.insertedId
}
exports.insertNewPhoto = insertNewPhoto

/*
 * Executes a DB query to fetch a single specified photo based on its ID.
 * Returns a Promise that resolves to an object containing the requested
 * photo.  If no photo with the specified ID exists, the returned Promise
 * will resolve to null.
 */
async function getPhotoById(id) {
    const db = getDb()
    const collection = db.collection('photos')
    if (!ObjectId.isValid(id)) {
        return null
    } else {
        const results = await collection
        .find({ _id: new ObjectId(id) })
        .toArray()
        return results[0]
    }
}
exports.getPhotoById = getPhotoById

async function updatePhotoById(id, photo) {
  const db = getDb()
  const collection = db.collection('photos')

  const result = await collection.replaceOne(
    { _id: new ObjectId(id) }, 
    photo
  )

  return result.matchedCount > 0
}
exports.updatePhotoById = updatePhotoById
