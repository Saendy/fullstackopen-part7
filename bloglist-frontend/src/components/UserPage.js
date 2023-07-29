import BlogList from './BlogList'
import BlogForm from './BlogForm'

const UserPage = ({ user, blogs, handleLogout, handleCreate, addLike, handleDelete }) => {

    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
            <BlogForm handleCreate={handleCreate} />
            <BlogList blogs={blogs} addLike={addLike} user={user} handleDelete={handleDelete} />
        </div>
    )

}

export default UserPage