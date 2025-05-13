//import application
const express = require('express')
const app = module.exports = express()

//import data and validation functions
const photos = require('../data/photos.json')
const businesses = require("../data/businesses.json")
const validatePhotosBody = require("../utils/validatePhotoBody")

//photos endpoint
app.get("/photos", (req, res, next) => {
    res.status(200).json(photos)
})

app.put("/photos/:id", (req, res, next) => {
    let id = parseInt(req.params.id)

    if (photos[id]) {
        if (validatePhotosBody(req.body)) {
            req.body['id'] = id
            req.body['userid'] = photos[id].userid
            req.body['businessid'] = photos[id].businessid

            photos[id] = req.body

            res.status(200).json({
                "links": {
                    "photo": `/photos/${id}`
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

app.post("/photos", (req, res, next) => {
    if (validatePhotosBody(req.body) && businesses[req.body.businessid]) {
        let photo = req.body
        photo['id'] = photos.length
        
        photos.push(photo)

        res.status(201).json({
            "id": photos.length - 1,
            "links": {
                "photo": `/photos/${photos.length - 1}`
            }
        })
    } else {
        res.status(400).json({
            err: "Request JSON body is in incorrect format or business does not exist"
        })
    }
})

app.delete("/photos/:id", (req, res, next) => {
    let id = parseInt(req.params.id)

    if(photos[id]){
        photos[id] = null
        res.status(204).end()
    } else {
        next()
    }
})