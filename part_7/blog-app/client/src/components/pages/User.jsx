import { Link } from 'react-router-dom'

const User = ({ user }) => {
  const styles = {
    margin: '1rem 0'
  }

  return (
    <>
      {user && (
        <>
          <h2>{user.name}</h2>
          <h3>added blogs</h3>
          <ul>
            {user.blogs.map(blog => (
              <li key={blog.id} style={styles}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default User
