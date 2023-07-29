

const BlogDetails = ({ blog, addLike, user, handleDelete }) => {
    return (
        <div>
            <p>{blog.url}</p>
            <p>likes {blog.likes}<button onClick={() => addLike(blog)}>like</button></p>
            <p>{blog.user.name}</p>
            {blog.user.username === user.username && <button onClick={() => handleDelete(blog)}>delete</button>}
        </div>
    )
}

export default BlogDetails