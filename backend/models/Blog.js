const mongoose = require('mongoose')

// make mongoose blogSchema schema into a module
// make mongoose Blog model into a module

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

blogSchema.set('toJSON', {
    transform: (doc, retObj) => {
        retObj.id = retObj._id.toString()
        delete retObj._id
        delete retObj.__v
    }
})
module.exports = mongoose.model('Blog', blogSchema)
