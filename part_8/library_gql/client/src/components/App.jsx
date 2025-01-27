import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { useApolloClient, useSubscription } from '@apollo/client'
import Alert from './Alert'
import Authors from './Authors'
import Books from './Books'
import BookForm from './BookForm'
import LoginForm from './LoginForm'
import Recommendations from './Recommendations'
import { ALL_BOOKS, BOOK_ADDED } from '../gql/queries'



const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const linkStyles = {
    padding: 4,
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      const query = { query: ALL_BOOKS, variables: { genre: 'all-genres' } }
      
      window.alert(`${addedBook.title} added`)
      client.cache.updateQuery(query, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    },
  })

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
            <Link
              style={linkStyles}
              to='/recommendations'>
              recommendations
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
          element={<Authors setError={alert} />}
        />
        <Route
          path='/books'
          element={<Books />}
        />
        <Route
          path='/add-book'
          element={<BookForm setError={alert} />}
        />
        <Route
          path='/recommendations'
          element={token ? <Recommendations /> : <Navigate to='/login' />}
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
