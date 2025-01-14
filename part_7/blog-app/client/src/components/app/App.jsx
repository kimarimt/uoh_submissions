import { useAlertValue } from '../contexts/AlertContext'
import { useLogout, useUserValue } from '../contexts/UserContext'
import { Link, Routes, Route, Navigate, useMatch } from 'react-router-dom'
import Notification from '../helpers/Notification'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Users from '../pages/Users'
import User from '../pages/User'
import { useUsers } from '../../hooks/user'
import { useBlogs } from '../../hooks/blog'
import Blog from '../pages/Blog'

const App = () => {
  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')
  const { data: users } = useUsers()
  const { data: blogs } = useBlogs()
  const user = useUserValue()
  const logout = useLogout()
  const alert = useAlertValue()

  const appUser =
    userMatch && users ? users.find(u => u.id === userMatch.params.id) : null

  const blog =
    blogMatch && blogs ? blogs.find(b => b.id === blogMatch.params.id) : null

  const styles = {
    padding: 4,
  }

  return (
    <>
      <div className='navigation'>
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
      <div className='page'>
        <h1>Blog App</h1>
        {alert.message && (
          <Notification message={alert.message} color={alert.color} />
        )}
        <Routes>
          <Route path='/users/:id' element={<User user={appUser} />} />
          <Route
            path='/blogs/:id'
            element={
              user ? <Blog blog={blog} /> : <Navigate replace to='/login' />
            }
          />
          <Route path='/' element={<Home />} />
          <Route
            path='/users'
            element={user ? <Users /> : <Navigate replace to='/login' />}
          />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App
