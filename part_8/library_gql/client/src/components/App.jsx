import { Link, Route, Routes } from 'react-router-dom'
import Authors from './Authors'
import Books from './Books'
import BookForm from './BookForm'
import { useState } from 'react'
import Alert from './Alert'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const alert = message => {
    setErrorMessage(message)

    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const linkStyles = {
    padding: 4,
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
        <Link
          style={linkStyles}
          to='/add-book'>
          add book
        </Link>
      </div>
      {errorMessage && <Alert errorMessage={errorMessage} />}
      <Routes>
        <Route
          path='/'
          element={<Authors />}
        />
        <Route
          path='/books'
          element={<Books />}
        />
        <Route
          path='/add-book'
          element={<BookForm setError={alert} />}
        />
      </Routes>
    </>
  )
}

export default App
