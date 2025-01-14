import { useNavigate } from 'react-router-dom'
import { useField } from '../../hooks'
import { useLogin } from '../contexts/UserContext'

const Login = () => {
  const navigate = useNavigate()
  const { reset: usernameReset, ...username } = useField('username')
  const { reset: passwordReset, ...password } = useField('password', 'password')
  const login = useLogin()

  const loginUser = event => {
    event.preventDefault()
    login({ username: username.value, password: password.value })
    usernameReset()
    passwordReset()
    navigate('/')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input data-testid='username' {...username} />
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input data-testid='password' {...password} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
