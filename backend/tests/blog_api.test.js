const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'First Test Blog',
        author: 'First Test Author',
        url: 'First Test URL',
        likes: 1
    },
    {
        title: 'Second Test Blog',
        author: 'Second Test Author',
        url: 'Second Test URL',
        likes: 21
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain('First Test Blog')
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Third Test Blog',
        author: 'Third Test Author',
        url: 'Third Test URL',
        likes: 31
    }
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.status).toBe(201)
})

test('when adding a blog, the number of blogs increases by one', async () => {
    const newBlog = {
        title: 'Third Test Blog',
        author: 'Third Test Author',
        url: 'Third Test URL',
        likes: 31
    }
    await api.post('/api/blogs').send(newBlog)
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length + 1)
})

test('a blog without likes will default to 0 likes', async () => {
    const newBlog = {
        title: 'Fourth Test Blog',
        author: 'Fourth Test Author',
        url: 'Fourth Test URL'
    }
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.body.likes).toBe(0)
})

test('a blog without title and url will return 400', async () => {
    const newBlog = {
        author: 'Fifth Test Author',
        likes: 51
    }
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.status).toBe(400)
})

test('identifying field is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('delete a blog', async () => { 
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    await api.delete(`/api/blogs/${id}`)
    const response2 = await api.get('/api/blogs')
    expect(response2.body.length).toBe(initialBlogs.length - 1)
})

test('update a blog', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    const updatedBlog = {
        title: 'Updated Test Blog',
        author: 'Updated Test Author',
        url: 'Updated Test URL',
        likes: 11
    }
    await api.put(`/api/blogs/${id}`).send(updatedBlog)
    const response2 = await api.get('/api/blogs')
    expect(response2.body[0].title).toBe(updatedBlog.title)
})
