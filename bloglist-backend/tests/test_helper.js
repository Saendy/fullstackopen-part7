const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
    {
        title: 'blog 1',
        author: 'author 1',
        url: 'url 1',
        likes: 6
    },
    {
        title: 'blog 2',
        author: 'author 2',
        url: 'url 2',
        likes: 3
    },
]


const usersInDb = async () => {
    const users = await User.find({})
    return users
}

const generateToken = async () => {
    const loginRequest = { username: 'root', password: 'sekret' }
    const loginResponse = await api
        .post('/api/login')
        .send(loginRequest)
    return loginResponse.body.token
}

module.exports = {
    initialBlogs, usersInDb, generateToken
}