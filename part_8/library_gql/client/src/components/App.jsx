import { Link, Route, Routes } from 'react-router-dom'
import Authors from './Authors'

const App = () => {
  return (
    <>
      <div>
        <Link to='/'>authors</Link>
      </div>
      <Routes>
        <Route
          path='/'
          element={<Authors />}></Route>
      </Routes>
    </>
  )
}

export default App
