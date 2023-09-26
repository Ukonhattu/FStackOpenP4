const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/User')

const userExtractor = async (request, response, next) => {
    const token = request.token
    let decodedToken = null
    try {
        decodedToken = jwt.verify(token, config.SECRET)
    } catch (error) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    if (!token || !decodedToken || !user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    request.user = user
    next()
}
module.exports = userExtractor
