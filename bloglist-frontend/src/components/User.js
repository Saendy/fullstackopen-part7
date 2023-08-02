import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import userService from '../services/users'
import { useParams } from 'react-router-dom'
import { Box, List, ListItem, Typography } from '@mui/material'

const User = () => {
  const id = useParams().id
  const user = useQuery('user', () => userService.get(id))

  if (user.isSuccess) {
    return (
      <Box>
        <Typography variant="h2">{user.data.name}</Typography>
        <Typography variant="h4">Added Blogs</Typography>
        <List>
          {user.data.blogs.map((blog) => {
            return (
              <ListItem key={blog.id}>
                <Link to={`../blogs/${blog.id}`}> {blog.title}</Link>
              </ListItem>
            )
          })}
        </List>
      </Box>
    )
  }
}
export default User
