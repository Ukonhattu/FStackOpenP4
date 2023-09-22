const mongoose = require('mongoose')
const config = require('../utils/config')

// make mongoose blogSchema schema into a module
// make mongoose Blog model into a module

const DB_URI = config.MONGODB_URI
mongoose.connect(DB_URI)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})
module.exports = mongoose.model('Blog', blogSchema)
