const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('get all users suceeds', async () => {
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(1)

    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with a too-short username', async () => {
        const newUser = {
            username: 'as',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('creation fails with no username', async () => {
        const newUser = {
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('creation fails with a too-short password', async () => {
        const newUser = {
            username: 'asasdds',
            name: 'Matti Luukkainen',
            password: 'as'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('creation fails with no password', async () => {
        const newUser = {
            username: 'asasdds',
            name: 'Matti Luukkainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
})