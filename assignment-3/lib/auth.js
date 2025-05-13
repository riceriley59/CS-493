const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const jwtKey = process.env.JWT_KEY

function generateAuthToken(userId, admin) {
    if (!jwtKey) {
        console.log("Can't find JWT key. Exiting...")
        exit(1)
    }

    const payload = { 
        id: userId,
        admin: admin
    }

    return jwt.sign(payload, jwtKey, { expiresIn: '24h' })
}
exports.generateAuthToken = generateAuthToken

function requireAuthentication(req, res, next) {
    if (!jwtKey) {
        console.log("Can't find JWT key. Exiting...")
        exit(1)
    }

    const authHeader = req.get('Authorization') || ''
    const authHeaderParts = authHeader.split(' ')

    const token = authHeaderParts[0] === 'Bearer' ?
        authHeaderParts[1] : null

    try {
      const payload = jwt.verify(token, jwtKey)

      req.user = payload.id
      req.admin = payload.admin

      if (next !== undefined) next()
    } catch (e) {
      return res.status(401).send({
          error: "Invalid authentication token provided."
      })
    }
}
exports.requireAuthentication = requireAuthentication

function checkAuthentication(req) {
  if (!jwtKey) {
    console.log("Can't find JWT key. Exiting...")
    exit(1)
  }

  const authHeader = req.get('Authorization') || ''
  const authHeaderParts = authHeader.split(' ')

  const token = authHeaderParts[0] === 'Bearer' ?
      authHeaderParts[1] : null

  try {
    const payload = jwt.verify(token, jwtKey)

    req.user = payload.id

    return true
  } catch (e) {
    return false
  }
}
exports.checkAuthentication = checkAuthentication

async function isAuthenticated(providedPass, dbPass) {
    return await bcrypt.compare(providedPass, dbPass)
}
exports.isAuthenticated = isAuthenticated
