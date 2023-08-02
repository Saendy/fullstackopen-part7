import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Link as MuiLink,
  Button,
  List,
  ListItem,
} from '@mui/material'

const BlogDetails = ({
  blogs,
  addLike,
  user,
  handleDelete,
  handleAddComment,
}) => {
  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

  return (
    <Card>
      <CardHeader title={blog.title} />
      <CardContent>
        <MuiLink href={blog.url}>{blog.url}</MuiLink>
        <Typography>
          likes {blog.likes}
          <Button variant="outlined" onClick={() => addLike(blog)}>
            like
          </Button>
        </Typography>
        <Typography>
          added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
        </Typography>
        {user && blog.user.username === user.username && (
          <Button variant="outlined" onClick={() => handleDelete(blog)}>
            delete
          </Button>
        )}
        <Typography variant="h3">comments</Typography>
        <CommentForm blog={blog} handleAddComment={handleAddComment} />
        <List>
          {' '}
          {blog.comments.map((comment, index) => {
            return <ListItem key={`${index}-${comment}`}>{comment}</ListItem>
          })}
        </List>
      </CardContent>
    </Card>
  )
}

export default BlogDetails
