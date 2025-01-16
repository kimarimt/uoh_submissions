import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Input,
  Typography,
} from '@mui/material'
import { useField } from '../../hooks'
import { useLogin } from '../contexts/UserContext'

const Login = () => {
  const { reset: usernameReset, ...username } = useField('username')
  const { reset: passwordReset, ...password } = useField('password', 'password')
  const login = useLogin()

  const loginUser = event => {
    event.preventDefault()
    login({ username: username.value, password: password.value })
    usernameReset()
    passwordReset()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '100%',
        paddingTop: '3rem',
      }}
    >
      <Typography variant='h4' component='h2'>
        Login
      </Typography>
      <form className='loginForm' onSubmit={loginUser}>
        <FormControl variant='standard' fullWidth>
          <InputLabel htmlFor='username'>Username</InputLabel>
          <Input data-testid='username' {...username} />
        </FormControl>
        <FormControl variant='standard' fullWidth>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <Input data-testid='password' {...password} />
        </FormControl>
        <Button sx={{ my: 2 }} variant='contained' type='submit'>Login</Button>
      </form>
    </Box>
  )
}

export default Login
