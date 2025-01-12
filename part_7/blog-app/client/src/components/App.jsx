import { useEffect, useState } from 'react'
import Page from './Page'
import Notification from './Notification'
import Home from './Home'
import Login from './Login'
import blogService from '../services/blog'
import loginService from '../services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('')

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('appUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const loginUser = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('appUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (err) {
      const message = err.response.data.error
      alertUser(message, 'red')
    }
  }

  const logoutUser = () => {
    window.localStorage.removeItem('appUser')
    blogService.setToken(null)
    setUser(null)
  }

  const alertUser = (message, color) => {
    setMessage(message)
    setColor(color)

    setTimeout(() => {
      setMessage(null)
      setColor('')
    }, 3000)
  }

  const title = user ? 'BlogApp Home Page' : 'BlogApp Login'
  const currentUser = user
    ? JSON.parse(window.localStorage.getItem('appUser')).name
    : null

  return (
    <Page title={title}>
      {message && <Notification message={message} color={color} />}
      {user && currentUser ? (
        <Home
          name={user.name}
          currentUser={currentUser}
          alertUser={alertUser}
          handleLogout={logoutUser}
        />
      ) : (
        <Login loginUser={loginUser} />
      )}
    </Page>
  )
}

export default App
