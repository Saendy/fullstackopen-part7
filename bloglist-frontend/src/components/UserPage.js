import { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import { Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const UserPage = ({ handleLogout }) => {
  const [user] = useContext(UserContext)
  if (user) {
    return (
      <>
        <Typography variant="span" sx={{ marginRight: '5px' }}>
          {user.name} logged in
        </Typography>
        <Button color="secondary" variant="contained" onClick={handleLogout}>
          logout
        </Button>
      </>
    )
  } else {
    return (
      <Button
        color="secondary"
        variant="contained"
        component={Link}
        to="/login"
      >
        login
      </Button>
    )
  }
}

export default UserPage
