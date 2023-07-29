const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.post('/', async (request, response) => {

    const user = request.user
    if (user) {
        const blog = new Blog({
            title: request.body.title,
            url: request.body.url,
            likes: request.body.likes,
            author: request.body.author,
            user: user.id
        })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    } else {
        response.status(401).json({ error: 'User authorisation is required to create blogs' })
    }
})

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.delete('/:id', async (request, response) => {
    const user = request.user
    if (user) {
        const toBeDeleted = await Blog.findById(request.params.id)

        if (user._id.toString() === toBeDeleted.user.toString()) {

            user.blogs = user.blogs.filter(blog => blog !== toBeDeleted.id)
            await user.save()

            await Blog.findByIdAndRemove(toBeDeleted.id)
            response.status(204).end()
        } else {
            response.status(403).json({ error: 'user is not authorised to delete blog' })
        }
    } else {
        response.status(401).json({ error: 'User authorisation is required to delete blogs' })
    }
})

blogRouter.get('/:id', async (request, response) => {
    const blogs = await Blog.findById(request.params.id)
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.put('/:id', async (request, response) => {

    const user = request.user
    if (user) {
        //const toBeUpdated = await Blog.findById(request.params.id)

        //if (user._id.toString() === toBeUpdated.user.toString()) {
        const blog = {
            title: request.body.title,
            url: request.body.url,
            author: request.body.author,
            likes: request.body.likes
        }
        const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
        response.status(201).json(result)
        //} else {
        //    response.status(403).json({ error: 'user is not authorised to update blog' })
        //}
    } else {
        response.status(401).json({ error: 'User authorisation is required to update blogs' })
    }
})

module.exports = blogRouter