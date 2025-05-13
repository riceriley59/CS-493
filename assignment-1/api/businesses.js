//import application
const express = require('express')
const app = module.exports = express()

//import data and validation functions
const businesses = require('../data/businesses.json')
const reviews = require('../data/reviews.json')
const photos = require('../data/photos.json')

const validateBusinessBody = require('../utils/validateBusinessBody')

//businesses endpoints
app.get("/businesses", (req, res, next) => {
    const pageInt = parseInt(req.query.page)
    const limitInt = parseInt(req.query.limit)

    const page = pageInt <= 0 ? 1 : pageInt || 1
    const limit = limitInt <= 0 ? 10 : limitInt || 10

    const totalItems = businesses.length
    const totalPages = Math.ceil(totalItems / limit)

    const currentPage = Math.min(page, totalPages)

    const start = (currentPage - 1) * limit
    const end = Math.min(start + limit, totalItems)

    const paginatedData = businesses.slice(start, end)

    res.status(200).json({
        "totalItems": businesses.length,
        "itemsPerPage": limit,
        "currentPage": currentPage,
        "totalPages": totalPages,
        "businesses": paginatedData
    })
})

app.get("/businesses/:id", (req, res, next) => {
    let id = parseInt(req.params.id)

    if (businesses[id]){
        res.status(200).json({
            "business": businesses[id],
            "photos": photos.filter(photo => photo && photo.businessid == id),
            "reviews": reviews.filter(review => review && review.businessid == id)
        })
    } else {
        next()
    }
})

app.put("/businesses/:id", (req, res, next) => {
    let id = parseInt(req.params.id)

    if (businesses[id]) {
        if (validateBusinessBody(req.body)) {
            req.body['id'] = id
            req.body['ownerid'] = businesses[id].ownerid

            businesses[id] = req.body

            res.status(200).json({
                "links": {
                    "business": `/business/${id}`
                }
            })
        } else {
            res.status(404).json({
                err: "Request JSON body is in incorrect format"
            })
        }
    } else {
        next()
    }
})

app.post("/businesses", (req, res, next) => {
    if (validateBusinessBody(req.body)) {
        let business = req.body
        business['id'] = businesses.length
        
        businesses.push(business)

        res.status(201).json({
            "id": businesses.length - 1,
            "links": {
                "business": `/business/${businesses.length - 1}`
            }
        })
    } else {
        res.status(400).json({
            err: "Request JSON body is in incorrect format"
        })
    }
})

app.delete("/businesses/:id", (req, res, next) => {
    let id = parseInt(req.params.id)

    if(businesses[id]){
        businesses[id] = null
        res.status(204).end()
    } else {
        next()
    }
})
