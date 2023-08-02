import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'

const CommentForm = ({ blog, handleAddComment }) => {
  const [comment, setComment] = useState('')

  return (
    <Box>
      <form onSubmit={(event) => handleAddComment(event, blog, comment)}>
        <TextField
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          placeholder="comment"
        />
        <Button variant="contained" type="submit">
          add comment
        </Button>
      </form>
    </Box>
  )
}
export default CommentForm
