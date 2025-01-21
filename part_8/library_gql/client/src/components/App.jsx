import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import Alert from './Alert'
import Authors from './Authors'
import Books from './Books'
import BookForm from './BookForm'
import LoginForm from './LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const linkStyles = {
    padding: 4,
  }

  useEffect(() => {
    const loggedUser = localStorage.getItem('library-user-token')

    if (loggedUser) {
      setToken(loggedUser)
    }
  }, [])

  const alert = message => {
    setErrorMessage(message)

    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <>
      <div>
        <Link
          style={linkStyles}
          to='/'>
          authors
        </Link>
        <Link
          style={linkStyles}
          to='/books'>
          books
        </Link>
        {token ? (
          <>
            <Link
              style={linkStyles}
              to='/add-book'>
              add book
            </Link>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <Link
            style={linkStyles}
            to='/login'>
            login
          </Link>
        )}
      </div>
      {errorMessage && <Alert errorMessage={errorMessage} />}
      <Routes>
        <Route
          path='/'
          element={
            token ? <Authors setError={alert} /> : <Navigate to='/login' />
          }
        />
        <Route
          path='/books'
          element={token ? <Books /> : <Navigate to='/login' />}
        />
        <Route
          path='/add-book'
          element={
            token ? <BookForm setError={alert} /> : <Navigate to='/login' />
          }
        />
        <Route
          path='/login'
          element={
            <LoginForm
              setError={alert}
              setToken={setToken}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App
