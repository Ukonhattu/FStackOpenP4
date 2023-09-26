const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', (_, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', async (request, response) => {
    const user = request.user
    const blog = new Blog({
        ...request.body,
        user: user._id
    })
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

blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error: 'unauthorized' })
    }
    Blog.deleteOne({ _id: request.params.id })
        .then(result => {
            response.status(204).end()
        })
})

blogsRouter.put('/:id', async (request, response) => {
    const user = request.user
    const oldblog = await Blog.findById(request.params.id)
    if (oldblog.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error: 'unauthorized' })
    }
    const blog = request.body
    Blog.updateOne({ _id: request.params.id }, blog)
        .then(result => {
            response.json(result)
        })
})

module.exports = blogsRouter
