import { Link } from 'react-router-dom'
import { useBlogs } from '../../hooks/blog'

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
            <li key={blog.id} className='blog-tile'>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} | {blog.author}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
export default Blogs
