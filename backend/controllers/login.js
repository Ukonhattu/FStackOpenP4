const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    const user = await User.findOne({ username })
    const passwdCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    if (!(user && passwdCorrect)) {
        return response.status(401).json({ error: 'invalid username or password' })
    }
    const userForToken = {
        username,
        id: user._id
    }
    const token = jwt.sign(userForToken, config.SECRET)
    response.status(200).send({ token, username, name: user.name })
})

module.exports = loginRouter
