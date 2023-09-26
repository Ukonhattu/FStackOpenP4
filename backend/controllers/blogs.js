const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', (_, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    if (!blog.likes) {
        blog.likes = 0
    }
    if (!blog.title || !blog.url) {
        return response.status(400).end()
    }
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

blogsRouter.delete('/:id', (request, response) => {
    Blog.deleteOne({ _id: request.params.id })
        .then(result => {
            response.status(204).end()
        })
})

blogsRouter.put('/:id', (request, response) => {
    const blog = request.body
    Blog.updateOne({ _id: request.params.id }, blog)
        .then(result => {
            response.json(result)
        })
})

module.exports = blogsRouter
