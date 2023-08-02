import { useQuery } from 'react-query'
import userService from '../services/users'
import { Link } from 'react-router-dom'
import {
  Box,
  Table,
  TableContainer,
  Typography,
  Paper,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material'

const Users = () => {
  const users = useQuery('users', userService.getAll)
  if (users.isSuccess) {
    return (
      <Box>
        <Typography variant="h2">Users</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell h>user</TableCell>
                <TableCell>blogs created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.data.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell>{user.blogs.length}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  } else {
    return (
      <div>
        <h2>Loading Users...</h2>
      </div>
    )
  }
}
export default Users
