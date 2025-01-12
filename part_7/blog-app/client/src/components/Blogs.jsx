import Blog from './Blog'

const Blogs = ({ blogs, currentUser, addLike, deleteBlog }) => {
  const blogsByLikes = blogs.toSorted((a, b) => b.likes - a.likes)

  return (
    <>
      {blogsByLikes.length !== 0 ? (
        <>
          <h2>Blogs</h2>
          <ul>
            {blogsByLikes.map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                currentUser={currentUser}
                onClick={() => addLike(blog.id)}
                onDelete={() => deleteBlog(blog.id)}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>No blogs found!</p>
      )}
    </>
  )
}
export default Blogs
