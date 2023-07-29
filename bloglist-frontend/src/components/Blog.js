import { useState } from 'react'
import BlogDetails from './BlogDetails'

const Blog = ({ blog, addLike, user, handleDelete }) => {
    const [show, setShow] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle} className='blog'>
            {blog.title} {blog.author} {show ?
                <button onClick={() => setShow(false)}>hide</button>
                :
                <button onClick={() => setShow(true)}>show</button>}
            {show && <BlogDetails blog={blog} addLike={addLike} user={user} handleDelete={handleDelete} />}
        </div>
    )
}

export default Blog