const redisClient = require("./redis")

const { checkAuthentication } = require('./auth')

const rateLimitWindowMilliseconds = 60000

const rateLimitIPWindowMaxRequests = 5
const rateLimitUserWindowMaxRequests = 10

async function rateLimit(req, res, next) {
  let tokenBucket
  let rateLimitWindowMaxRequests
  let key

  if (checkAuthentication(req) === false) {
    rateLimitWindowMaxRequests = rateLimitIPWindowMaxRequests  
    key = req.ip
  } else {
    rateLimitWindowMaxRequests = rateLimitUserWindowMaxRequests  
    key = req.user.toString()
  }

  try {
    tokenBucket = await redisClient.hGetAll(key)
  } catch (e) {
    next()
    return
  }

  tokenBucket = {
    tokens: parseFloat(tokenBucket.tokens) || rateLimitWindowMaxRequests,
    last: parseInt(tokenBucket.last) || Date.now()
  }

  const timeStamp = Date.now()
  const elapsedMilliseconds = timeStamp - tokenBucket.last
  const refreshRate = rateLimitWindowMaxRequests / rateLimitWindowMilliseconds
  
  tokenBucket.tokens += elapsedMilliseconds * refreshRate 
  tokenBucket.tokens = Math.min(rateLimitWindowMaxRequests, tokenBucket.tokens)
  tokenBucket.last = timeStamp

  if (tokenBucket.tokens >= 1) {
    tokenBucket.tokens -= 1

    await redisClient.hSet(key, [
      ['tokens', tokenBucket.tokens],
      ['last', tokenBucket.last]
    ])

    next()
  } else {
    await redisClient.hSet(key, [
      ['tokens', tokenBucket.tokens],
      ['last', tokenBucket.last]
    ])

    res.status(429).send({
      error: "Too many request per minute."
    })
  }
}
module.exports = rateLimit
