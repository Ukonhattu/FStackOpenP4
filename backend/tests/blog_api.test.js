const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const api = supertest(app)

let initialBlogs = [

]

let token = null
let user = null

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('testpassword', 10)
    user = new User({ username: 'testuser', passwordHash })

    await user.save()

    token = jwt.sign({ username: user.username, id: user._id }, config.SECRET)

    initialBlogs = [
        {
            title: 'Test Blog 1',
            author: 'Test Author 1',
            url: 'http://testblog1.com',
            likes: 5,
            user: user._id
        },
        {
            title: 'Test Blog 2',
            author: 'Test Author 2',
            url: 'http://testblog2.com',
            likes: 10,
            user: user._id
        }
    ]

    await Blog.deleteMany({})
    for (const blog of initialBlogs) {
        const blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .expect(200)
        .expect('Content-type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)

    expect(response.body.length).toBe(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)

    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain('Test Blog 1')
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Third Test Blog',
        author: 'Third Test Author',
        url: 'Third Test URL',
        user: user._id,
        likes: 31
    }
    const response = await api.post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
    expect(response.status).toBe(201)
})

test('when adding a blog, the number of blogs increases by one', async () => {
    const newBlog = {
        title: 'Third Test Blog',
        author: 'Third Test Author',
        url: 'Third Test URL',
        user: user._id,
        likes: 31
    }
    await api.post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
    const response = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
    expect(response.body.length).toBe(initialBlogs.length + 1)
})

test('a blog without likes will default to 0 likes', async () => {
    const newBlog = {
        title: 'Fourth Test Blog',
        author: 'Fourth Test Author',
        url: 'Fourth Test URL',
        user: user._id
    }
    const response = await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newBlog)
    expect(response.body.likes).toBe(0)
})

test('a blog without title and url will return 400', async () => {
    const newBlog = {
        author: 'Fifth Test Author',
        likes: 51
    }
    const response = await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newBlog)
    expect(response.status).toBe(400)
})

test('identifying field is named id', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
    expect(response.body[0].id).toBeDefined()
})

test('delete a blog', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
    const id = response.body[0].id
    await api.delete(`/api/blogs/${id}`).set('Authorization', `bearer ${token}`)
    const response2 = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
    expect(response2.body.length).toBe(initialBlogs.length - 1)
})

test('update a blog', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
    const id = response.body[0].id
    const updatedBlog = {
        title: 'Updated Test Blog',
        author: 'Updated Test Author',
        url: 'Updated Test URL',
        likes: 11,
        user: user._id
    }
    await api.put(`/api/blogs/${id}`).set('Authorization', `bearer ${token}`).send(updatedBlog)
    const response2 = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
    expect(response2.body[0].title).toBe(updatedBlog.title)
})
