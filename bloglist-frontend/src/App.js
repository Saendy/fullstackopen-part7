import { useState, useEffect } from 'react'
import UserPage from './components/UserPage'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Error from './components/Error'
import Message from './components/Message'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [infoMessage, setInfoMessage] = useState('')
    const [user, setUser] = useState(null)

    const showError = (error) => {
        setErrorMessage(error)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const showMessage = (message) => {
        setInfoMessage(message)
        setTimeout(() => {
            setInfoMessage(null)
        }, 5000)
    }

    const handleDelete = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                let deleteResponse = await blogService.deleteBlog(user, blog)
                if (deleteResponse.status === 204) {
                    setBlogs(blogs.filter((item) => {
                        return (item.id !== blog.id)
                    }))
                    showMessage(`${blog.title} deleted`)
                }


            } catch (exception) {
                showError(`cannot delete ${blog.title}`)
            }
        }
    }

    const handleAddLike = async (blog) => {
        let responseBlog = await blogService.addLike(user, blog)
        const blogList = [...blogs]
        blogList[blogList.findIndex((blog) => blog.id === responseBlog.id)].likes = responseBlog.likes

        setBlogs(blogList)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            showError('wrong username or password')
        }

    }

    const handleCreate = async (event, blog) => {
        event.preventDefault()

        try {
            let newBlog = await blogService.createBlog(user, blog)
            newBlog.user = { id: user.id, name: user.name, username: user.username }
            setBlogs([...blogs, newBlog])
            showMessage(`a new blog ${newBlog.title} added`)
        } catch (exception) {
            showError(exception.response.data.error)
        }
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')
    }

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            //noteService.setToken(user.token)
        }
    }, [])

    return (
        <div>
            {errorMessage && <Error error={errorMessage} />}
            {infoMessage && <Message message={infoMessage} />}
            {user !== null ?
                <UserPage
                    user={user}
                    blogs={blogs}
                    handleLogout={handleLogout}
                    handleCreate={handleCreate}
                    addLike={handleAddLike}
                    handleDelete={handleDelete} />
                :
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleSubmit={handleLogin} />}
        </div>
    )
}

export default App