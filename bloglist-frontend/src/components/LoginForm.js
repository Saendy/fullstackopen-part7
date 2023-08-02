import { TextField, Button, Typography, Card, CardContent } from '@mui/material'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h2">Login</Typography>

        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Username"
              variant="outlined"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <TextField
              label="Password"
              variant="outlined"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Button
            color="secondary"
            variant="contained"
            id="login-button"
            type="submit"
          >
            login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
