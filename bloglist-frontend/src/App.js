import { useState, useEffect, useReducer } from 'react'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import NotificationContext from './contexts/NotificationContext'
import UserContext from './contexts/UserContext'
import { notificationReducer, userReducer } from './Reducers'
import { Routes, Route, useNavigate } from 'react-router-dom'
import BlogList from './components/BlogList'
import Navigation from './components/Navigation'
import Users from './components/Users'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import { Container } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { themeOptions } from './themeOptions'

const theme = createTheme(themeOptions)

const App = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    mode: 'none',
    value: '',
  })
  const [user, userDispatch] = useReducer(userReducer, null)
  const queryClient = useQueryClient()

  const blogs = useQuery('blogs', blogService.getAll)

  const newBlogMutation = useMutation(blogService.createBlog)
  const deleteBlogMutation = useMutation(blogService.deleteBlog)
  const addLikeMutation = useMutation(blogService.addLike)
  const addCommentMutation = useMutation(blogService.addComment)

  const showError = (error) => {
    notificationDispatch({ type: 'SET', mode: 'error', value: error })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const showMessage = (message) => {
    notificationDispatch({ type: 'SET', mode: 'info', value: message })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        deleteBlogMutation.mutate(
          { user, blog },
          {
            onSuccess: () => {
              showMessage(`${blog.title} deleted`)
              const blogs = queryClient.getQueryData('blogs')
              queryClient.setQueryData(
                'blogs',
                blogs.filter((b) => b.id !== blog.id)
              )
            },
          }
        )
      } catch (exception) {
        showError(`cannot delete ${blog.title}`)
      }
    }
  }

  const handleAddLike = (blog) => {
    addLikeMutation.mutate(
      { user, blog },
      {
        onSuccess: (likedBlog) => {
          showMessage(`${likedBlog.data.title} liked`)
          const blogs = queryClient.getQueryData('blogs')
          blogs[blogs.findIndex((b) => b.id === blog.id)].likes++
          queryClient.setQueryData('blogs', blogs)
        },
      }
    )
  }

  const handleAddComment = (event, blog, comment) => {
    event.preventDefault()

    addCommentMutation.mutate(
      { blog, comment },
      {
        onSuccess: () => {
          showMessage(`${comment} added`)
          const blogs = queryClient.getQueryData('blogs')
          blogs[blogs.findIndex((b) => b.id === blog.id)].comments.push(comment)
          queryClient.setQueryData('blogs', blogs)
        },
      }
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      userDispatch({ type: 'SET', user: user })
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (exception) {
      showError('wrong username or password')
    }
  }

  const handleCreate = (event, blog) => {
    event.preventDefault()

    try {
      newBlogMutation.mutate(
        { user, blog },
        {
          onSuccess: (newBlog) => {
            showMessage(`a new blog ${newBlog.title} added`)
            const blogs = queryClient.getQueryData('blogs')
            queryClient.setQueryData('blogs', blogs.concat(newBlog))
          },
        }
      )
    } catch (exception) {
      showError(exception.response.data.error)
    }
  }

  const handleLogout = () => {
    console.log('logout')
    userDispatch({ type: 'CLEAR' })
    window.localStorage.removeItem('loggedBlogappUser')
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET', user: user })
    }
  }, [])
  if (blogs.isSuccess) {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <div>
            <NotificationContext.Provider
              value={[notification, notificationDispatch]}
            >
              <Notification />
            </NotificationContext.Provider>
            <UserContext.Provider value={[user, userDispatch]}>
              <Navigation handleLogout={handleLogout} />
              <Routes>
                <Route
                  path="/blogs/:id"
                  element={
                    <BlogDetails
                      blogs={blogs.data}
                      addLike={handleAddLike}
                      handleDelete={handleDelete}
                      user={user}
                      handleAddComment={handleAddComment}
                    />
                  }
                />
                <Route path="/users/:id" element={<User />} />
                <Route path="/users" element={<Users />} />
                <Route
                  path="/login"
                  element={
                    <LoginForm
                      username={username}
                      password={password}
                      handleUsernameChange={({ target }) =>
                        setUsername(target.value)
                      }
                      handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                      }
                      handleSubmit={handleLogin}
                    />
                  }
                />
                <Route
                  path="/"
                  element={
                    <BlogList
                      blogs={blogs.data}
                      addLike={handleAddLike}
                      user={user}
                      handleDelete={handleDelete}
                      handleCreate={handleCreate}
                    />
                  }
                />
              </Routes>
            </UserContext.Provider>
          </div>
        </Container>
      </ThemeProvider>
    )
  }
}

export default App
