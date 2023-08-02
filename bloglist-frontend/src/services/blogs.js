import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async (payload) => {
  const request = await axios.post(baseUrl, payload.blog, {
    headers: {
      'content-type': 'application/json',
      Authorization: `bearer ${payload.user.token}`,
    },
  })
  return request.data
}

const addLike = async (payload) => {
  const updateBlog = { ...payload.blog }
  updateBlog.likes++
  delete updateBlog.user
  const request = await axios.put(`${baseUrl}/${payload.blog.id}`, updateBlog, {
    headers: {
      'content-type': 'application/json',
      Authorization: `bearer ${payload.user.token}`,
    },
  })
  return request
}

const addComment = async (payload) => {
  const request = await axios.post(
    `${baseUrl}/${payload.blog.id}/comments`,
    { comment: payload.comment },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  )
  return request
}

const deleteBlog = async (payload) => {
  const request = await axios.delete(`${baseUrl}/${payload.blog.id}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `bearer ${payload.user.token}`,
    },
  })
  return request
}

const exports = { getAll, createBlog, addLike, deleteBlog, addComment }
export default exports
