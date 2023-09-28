const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middlewares = require('./middlewares/index')
const testRouter = require('./controllers/testing')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
if (process.env.NODE_ENV === 'test') {
    console.log('test mode')
    app.use('/api/testing', testRouter)
}
app.use('/api/login', loginRouter)
app.use('/api/blogs', middlewares.tokenExtractor, middlewares.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app
