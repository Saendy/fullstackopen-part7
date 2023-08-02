import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Button, Typography } from '@mui/material'
import UserPage from './UserPage'

const Navigation = ({ handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" />
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Typography component="div" sx={{ flexGrow: 1 }} />
        <UserPage handleLogout={handleLogout} />
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
