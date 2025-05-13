const express = require('express')
const app = module.exports = express()

const validateReviewBody = require('../utils/validateReviewBody')
const reviews = require('../data/reviews.json')
const businesses = require('../data/businesses.json')

//reviews endpoint
app.get("/reviews", (req, res, next) => {
    res.status(200).json(reviews)
})


app.put("/reviews/:id", (req, res, next) => {
    let id = parseInt(req.params.id)

    if (reviews[id]) {
        if (validateReviewBody(req.body)) {
            req.body['id'] = id
            req.body['userid'] = reviews[id].userid
            req.body['businessid'] = reviews[id].businessid

            reviews[id] = req.body

            res.status(200).json({
                "links": {
                    "review": `/reviews/${id}`
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

app.post("/reviews", (req, res, next) => {
    if (validateReviewBody(req.body) && businesses[req.body.businessid]) {
        let review = req.body
        review['id'] = reviews.length
        
        reviews.push(review)

        res.status(201).json({
            "id": reviews.length - 1,
            "links": {
                "review": `/reviews/${reviews.length - 1}`
            }
        })
    } else {
        res.status(400).json({
            err: "Request JSON body is in incorrect format or business doesn't exist"
        })
    }
})

app.delete("/reviews/:id", (req, res, next) => {
    let id = parseInt(req.params.id)

    if(reviews[id]){
        reviews[id] = null
        res.status(204).end()
    } else {
        next()
    }
})
