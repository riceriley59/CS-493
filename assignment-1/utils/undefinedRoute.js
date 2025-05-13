module.exports = (req, res, next) => {
    res.status(404).send({
        err: "The requested resource doesn't exist"
    })
}