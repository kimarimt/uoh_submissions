import { useBlogs } from '../hooks/blogs'
import Blog from './Blog'

const Blogs = ({ currentUser, addLike, deleteBlog }) => {
  const { data: blogs, isPending, error } = useBlogs()

  return (
    <>
      <h2>Blogs</h2>
      {error && <p>error fetching blogs...</p>}
      {isPending && <p>loading blogs...</p>}
      {blogs && (
        <ul>
          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              currentUser={currentUser}
              onClick={() => addLike(blog.id)}
              onDelete={() => deleteBlog(blog.id)}
            />
          ))}
        </ul>
      )}
    </>
  )
}
export default Blogs
