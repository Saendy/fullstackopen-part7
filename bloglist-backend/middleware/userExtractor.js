const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (request, response, next) => {

    if (request.token) {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        request.user = await User.findById(decodedToken.id)
    } else {
        request.user = null
    }

    next()
}

module.exports = userExtractor
