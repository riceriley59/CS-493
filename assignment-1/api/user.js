const express = require('express')
const app = module.exports = express()

const businesses = require('../data/businesses.json')
const reviews = require('../data/reviews.json')
const photos = require('../data/photos.json')

//users endpoint
app.get("/user/businesses/:userId", (req, res, next) => {
    const userId = parseInt(req.params.userId)

    const ownedBusinesses = businesses.filter(business => business && business.ownerid == userId)

    const pageInt = parseInt(req.query.page)
    const limitInt = parseInt(req.query.limit)

    const page = pageInt <= 0 ? 1 : pageInt || 1
    const limit = limitInt <= 0 ? 10 : limitInt || 10

    const totalItems = ownedBusinesses.length
    const totalPages = Math.ceil(totalItems / limit)

    const currentPage = Math.min(page, totalPages)

    const start = (currentPage - 1) * limit
    const end = Math.min(start + limit, totalItems)

    const paginatedData = ownedBusinesses.slice(start, end)

    if (ownedBusinesses.length > 0) {
        res.status(200).json({
            "totalItems": totalItems, 
            "itemsPerPage": limit,
            "currentPage": currentPage,
            "totalPages": totalPages,
            "businesses": paginatedData
        })
    } else {
        res.status(404).json(
            "Could not find owned businesses for the provided user."
        )
    }
})

app.get("/user/reviews/:userId", (req, res, next) => {
    const userId = parseInt(req.params.userId)

    const userReviews = reviews.filter(review => review && review.userid == userId)

    const pageInt = parseInt(req.query.page)
    const limitInt = parseInt(req.query.limit)

    const page = pageInt <= 0 ? 1 : pageInt || 1
    const limit = limitInt <= 0 ? 10 : limitInt || 10

    const totalItems = userReviews.length
    const totalPages = Math.ceil(totalItems / limit)

    const currentPage = Math.min(page, totalPages)

    const start = (currentPage - 1) * limit
    const end = Math.min(start + limit, totalItems)

    const paginatedData = userReviews.slice(start, end)

    if (userReviews.length > 0) {
        res.status(200).json({
            "totalItems": totalItems,
            "itemsPerPage": limit,
            "currentPage": currentPage, 
            "totalPages": totalPages,
            "reviews": paginatedData
        })
    } else {
        res.status(404).json(
            "Could not find any reviews for the provided user."
        )
    }
})

app.get("/user/photos/:userId", (req, res, next) => {
    const userId = parseInt(req.params.userId)

    const userPhotos = photos.filter(photo => photo && photo.userid == userId)

    const pageInt = parseInt(req.query.page)
    const limitInt = parseInt(req.query.limit)

    const page = pageInt <= 0 ? 1 : pageInt || 1
    const limit = limitInt <= 0 ? 10 : limitInt || 10

    const totalItems = userPhotos.length
    const totalPages = Math.ceil(totalItems / limit)

    const currentPage = Math.min(page, totalPages)

    const start = (currentPage - 1) * limit
    const end = Math.min(start + limit, totalItems)

    const paginatedData = userPhotos.slice(start, end)

    if (userPhotos.length > 0) {
        res.status(200).json({
            "totalItems": totalItems,
            "itemsPerPage": limit,
            "currentPage": currentPage,
            "totalPages": totalPages,
            "photos": paginatedData
        })
    } else {
        res.status(404).json(
            "Could not find any photos for the provided user."
        )
    }
})