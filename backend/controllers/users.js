const userRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

userRouter.post('/', (request, response) => {
    const { username, name, password } = request.body
    if (!username || !password) {
        return response.status(400).json({ error: 'username or password missing' })
    }
    if (password.length < 3) {
        return response.status(400).json({ error: 'password must be at least 3 characters long' })
    }
    const saltRounds = 10
    const passwordHash = bcrypt.hashSync(password, saltRounds)
    const user = new User({
        username,
        name,
        passwordHash
    })
    const savedUser = user.save()
    response.status(201).json(savedUser)
})

userRouter.get('/:d', (_, response) => {
    User.find({}).populate('blogs')
        .then(users => {
            response.json(users)
        }).catch(error => {
            console.log(error)
            response.status(500).end()
        })
})

userRouter.get('/', (request, response) => {
    User.find({}).populate('blogs')
        .then(users => {
            response.json(users)
        }).catch(error => {
            console.log(error)
            response.status(500).end()
        })
})

module.exports = userRouter
