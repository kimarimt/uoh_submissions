import NewBlog from './NewBlog'
import Blogs from './Blogs'
import { useLogout, useUserValue } from './UserContext'

const Home = () => {
  const user = useUserValue()
  const logout = useLogout()

  return (
    <div>
      <p>
        {user.name} is logged in <button onClick={logout}>logout</button>
      </p>
      <NewBlog />
      <Blogs />
    </div>
  )
}

export default Home
