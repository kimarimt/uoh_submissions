import { useAlertValue } from '../contexts/AlertContext'
import { useLogout, useUserValue } from '../contexts/UserContext'
import { Link, Routes, Route, Navigate, useMatch } from 'react-router-dom'
import Notification from '../helpers/Notification'
import {
  AppBar,
  Button,
  Box,
  Toolbar,
  Typography,
  Container,
} from '@mui/material'
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

  return (
    <>
      <AppBar position='static' component='nav'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button color='inherit' component={Link} to='/'>
            <Typography variant='h5'>BlogApp</Typography>
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color='inherit' component={Link} to='/'>
              blogs
            </Button>
            <Button color='inherit' component={Link} to='/users'>
              users
            </Button>
            {user ? (
              <>
                <Typography component='p' variant='body1' color='textSecondary' sx={{ mx: 1 }}>
                  {user.username} signed in
                </Typography>
                <Button color='inherit' onClick={logout}>
                  logout
                </Button>
              </>
            ) : (
              <Button color='inherit' component={Link} to='/login'>
                login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {alert.message && (
        <Notification
          component='div'
          message={alert.message}
          severity={alert.severity}
        />
      )}
      <Container component='div' maxWidth={false} disableGutters>
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
      </Container>
    </>
  )
}

export default App
