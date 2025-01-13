import user from '../../../server/src/models/user'
import { useField } from '../hooks'
import { useLogin } from './UserContext'

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
    <div>
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
