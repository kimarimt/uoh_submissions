const User = ({ user }) => {
  return (
    <>
      {user && (
        <>
          <h2>{user.name}</h2>
          <h3>added blogs</h3>
          <ul>
            {user.blogs.map(blog => (
              <li key={blog.id}>
                <p>{blog.title}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default User
