import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createBlog = (user, blog) => {

    const request = axios.post(baseUrl, blog, { headers: { 'content-type': 'application/json', Authorization: `bearer ${user.token}` } })
    return request.then(response => response.data)
}

const addLike = (user, blog) => {
    const updateBlog = { ...blog }
    updateBlog.likes++
    delete updateBlog.user

    const request = axios.put(`${baseUrl}/${blog.id}`, updateBlog, { headers: { 'content-type': 'application/json', Authorization: `bearer ${user.token}` } })
    return request.then(response => response.data)
}



const deleteBlog = (user, blog) => {
    const request = axios.delete(`${baseUrl}/${blog.id}`, { headers: { 'content-type': 'application/json', Authorization: `bearer ${user.token}` } })
    return request.then(response => response)
}

const exports = { getAll, createBlog, addLike, deleteBlog }
export default exports