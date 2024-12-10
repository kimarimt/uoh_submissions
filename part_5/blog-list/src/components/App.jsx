import { useState, useEffect } from 'react'

import PageView from './PageView'
import Notification from './Notification'
import HomePage from './HomePage'
import LoginForm from './LoginForm'

import loginService from '../services/login'
import blogService from '../services/blog'

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('')

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogListUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const loginUser = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogListUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      const message = error.response.data.error
      alertUser(message, 'red')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogListUser')
    setUser(null)
    blogService.setToken(null)
  }

  const alertUser = (message, color) => {
    setMessage(message)
    setColor(color)

    setTimeout(() => {
      setMessage(null)
      setColor('')
    }, 3000)
  }

  const title = user ? 'BlogList Home Page' : 'BlogList Login'

  return (
    <>
      <PageView title={title}>
        {message && <Notification message={message} color={color} />}
        {user ? (
          <HomePage
            name={user.name}
            handleLogout={handleLogout}
            alertUser={alertUser}
          />
        ) : (
          <LoginForm loginUser={loginUser} />
        )}
      </PageView>
    </>
  )
}

export default App
