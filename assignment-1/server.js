//import required libraries
const express = require('express')
const app = express()
const process = require("process")

//grab port from environment variable and fail if not defined
const port = process.env.PORT

if (!port) {
    console.log("PORT Environment Variable is not set exiting...")
    process.exit(1)
}

//setup middleware for logging and parsing json body
const requestLogger = require('./utils/requestLogger')

app.use(requestLogger)
app.use(express.json())

//import api routes and instantiate them
const businesses = require('./api/businesses')
const photos = require('./api/photos')
const reviews = require('./api/reviews')
const user = require('./api/user')

app.use(businesses)
app.use(photos)
app.use(reviews)
app.use(user)

//undefined endpoint route and handles all resources
const undefinedRoute = require('./utils/undefinedRoute')
app.use("*", undefinedRoute)

//start listening on defined port
app.listen(port, () => {
    console.log(`== Server is listening on port: ${port}`)
})
