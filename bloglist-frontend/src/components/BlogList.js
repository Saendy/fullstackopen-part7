import Blog from './Blog'

const BlogList = ({ blogs, addLike, user, handleDelete }) => {

    const sortedBlogs = [...blogs]
    sortedBlogs.sort((a, b) => {
        return b.likes - a.likes
    })

    return (
        <>

            {sortedBlogs.map(blog =>
                <Blog key={blog.id} blog={blog} addLike={addLike} user={user} handleDelete={handleDelete} />
            )}
        </>
    )
}
export default BlogList

