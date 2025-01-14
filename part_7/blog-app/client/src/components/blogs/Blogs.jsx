import { useBlogs } from '../../hooks/blog'
import Blog from './Blog'

const Blogs = () => {
  const { data: blogs, isPending, error } = useBlogs()
  const blogByLikes = blogs && blogs.toSorted((a, b) => b.likes - a.likes)

  return (
    <>
      {error && <p>{error.message}</p>}
      {isPending && <p>loading blogs...</p>}
      {blogByLikes && (
        <ul>
          {blogByLikes.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </ul>
      )}
    </>
  )
}
export default Blogs
