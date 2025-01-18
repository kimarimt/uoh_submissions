import { Link, Route, Routes } from 'react-router-dom'
import Authors from './Authors'
import Books from './Books'

const App = () => {
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
      </div>
      <Routes>
        <Route
          path='/'
          element={<Authors />}
        />
        <Route
          path='/books'
          element={<Books />}
        />
      </Routes>
    </>
  )
}

export default App
