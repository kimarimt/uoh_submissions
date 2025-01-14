import { useAlertValue } from '../contexts/AlertContext'
import { useLogout, useUserValue } from '../contexts/UserContext'
import { Link, Routes, Route, Navigate } from 'react-router-dom'
import Notification from '../helpers/Notification'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Users from '../pages/Users'

const App = () => {
  const user = useUserValue()
  const logout = useLogout()
  const alert = useAlertValue()
  const styles = {
    padding: 4,
  }

  return (
    <>
      <div>
        <Link style={styles} to='/'>
          blogs
        </Link>
        <Link style={styles} to='/users'>
          users
        </Link>
        {user ? (
          <span>
            <em>{user.username} logged in</em>
            <button onClick={logout}>logout</button>
          </span>
        ) : (
          <Link style={styles} to='/login'>
            login
          </Link>
        )}
      </div>
      <h1>Blog App</h1>
      {alert.message && (
        <Notification message={alert.message} color={alert.color} />
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/users'
          element={user ? <Users /> : <Navigate replace to='/login' />}
        />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
