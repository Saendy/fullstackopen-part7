const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeAll(async () => {

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
})


beforeEach(async () => {

    const token = await helper.generateToken()
    await Blog.deleteMany({})
    for (let blog of helper.initialBlogs) {
        await api
            .post('/api/blogs')
            .set('authorization', `Bearer ${token}`)
            .send(blog)
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('the correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)

})
test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('blog 2')
})

test('check blogs have an id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('adding a new blog is successful', async () => {
    const token = await helper.generateToken()
    const newBlog = {
        title: 'blog 3',
        author: 'author 3',
        url: 'url 3',
        likes: 6
    }

    await api
        .post('/api/blogs')
        .set('authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('blog 3')
})

test('add a blog with no likes specified defaults to 0', async () => {
    const token = await helper.generateToken()
    const newBlog = {
        title: 'blog 3',
        author: 'author 3',
        url: 'url 3'
    }

    const response = await api
        .post('/api/blogs')
        .set('authorization', `Bearer ${token}`)
        .send(newBlog)

    expect(response.body.likes).toBe(0)
})

test('creating a blog with no title returns status code 400', async () => {
    const token = await helper.generateToken()
    const newBlog = {
        author: 'author 3',
        url: 'url 3'
    }

    await api
        .post('/api/blogs')
        .set('authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
})

test('creating a blog with no url returns status code 400', async () => {
    const token = await helper.generateToken()
    const newBlog = {
        author: 'author 3',
        title: 'title 3'
    }

    await api
        .post('/api/blogs')
        .set('authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
})

test('creating a blog with no token returns status code 400', async () => {
    const newBlog = {
        title: 'blog 3',
        author: 'author 3',
        url: 'url 3'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
})


test('deleting a blog is successful', async () => {
    const token = await helper.generateToken()
    const blogsResponse = await api.get('/api/blogs')
    await api.delete(`/api/blogs/${blogsResponse.body[0].id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(204)


    const deleteBlogsResponse = await api.get('/api/blogs')
    expect(deleteBlogsResponse.body).toHaveLength(helper.initialBlogs.length - 1)

    const titles = deleteBlogsResponse.body.map(r => r.title)
    expect(titles).not.toContain(blogsResponse.body[0].title)
})

test('deleting a blog with invalid id returns status code 400', async () => {
    const token = await helper.generateToken()
    await api.delete('/api/blogs/a')
        .set('authorization', `Bearer ${token}`)
        .expect(400)
})

test('updating a blog is successful', async () => {
    const token = await helper.generateToken()
    const blogsResponse = await api.get('/api/blogs')
    const newBlog = {
        likes: blogsResponse.body[0].likes + 1
    }

    await api.put(`/api/blogs/${blogsResponse.body[0].id}`)
        .set('authorization', `Bearer ${token}`)
        .send(newBlog)

    const updatedBlogsResponse = await api.get('/api/blogs')
    expect(updatedBlogsResponse.body[0].likes).toBe(blogsResponse.body[0].likes + 1)
})

test('updating a blog with invalid id returns status code 400', async () => {
    const token = await helper.generateToken()
    const blogsResponse = await api.get('/api/blogs')
    const newBlog = {
        likes: blogsResponse.body[0].likes + 1
    }

    await api.put('/api/blogs/a')
        .set('authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
})


afterAll(async () => {
    await mongoose.connection.close()
})