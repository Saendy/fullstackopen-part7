import { useState } from 'react'
import {
  TextField,
  Button,
  CardActions,
  Card,
  CardHeader,
  CardContent,
  Collapse,
  IconButton,
  styled,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ExpandMore = styled((props) => {
  const { ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const BlogForm = ({ handleCreate }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [expanded, setExpanded] = useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: 345 }}>
      <CardHeader
        title="Create New"
        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }
      />
      <form
        onSubmit={(event) =>
          handleCreate(event, {
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl,
          })
        }
      >
        <Collapse in={expanded}>
          <CardContent>
            <div>
              <TextField
                value={blogTitle}
                onChange={({ target }) => setBlogTitle(target.value)}
                placeholder="title"
              />
            </div>
            <div>
              <TextField
                value={blogAuthor}
                onChange={({ target }) => setBlogAuthor(target.value)}
                placeholder="author"
              />
            </div>
            <div>
              <TextField
                value={blogUrl}
                onChange={({ target }) => setBlogUrl(target.value)}
                placeholder="url"
              />
            </div>
          </CardContent>
          <CardActions>
            <Button variant="outlined" type="submit">
              create
            </Button>
          </CardActions>
        </Collapse>
      </form>
    </Card>
  )
}
export default BlogForm
