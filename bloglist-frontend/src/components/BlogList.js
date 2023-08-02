import Blog from './Blog'
import BlogForm from './BlogForm'
import { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import {
  TableContainer,
  Paper,
  TableBody,
  Table,
  Typography,
} from '@mui/material'
const BlogList = ({ blogs, handleCreate }) => {
  const [user] = useContext(UserContext)
  const sortedBlogs = [...blogs]
  sortedBlogs.sort((a, b) => {
    return b.likes - a.likes
  })

  return (
    <>
      <Typography variant="h2">Blogs</Typography>
      {user && <BlogForm handleCreate={handleCreate} />}
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default BlogList
