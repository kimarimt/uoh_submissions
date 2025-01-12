import { useBlogs, useMutations } from '../hooks/blogs'
import Blog from './Blog'

const Blogs = ({ currentUser }) => {
  const { data: blogs, isPending, error } = useBlogs()
  const { updateBlogMutation, deleteBlogMutation } = useMutations()

  const likeBlog = async blog => {
    await updateBlogMutation.mutateAsync({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const deleteBlog = async blog => {
    const message = `Remove blog ${blog.title} by ${blog.author}?`

    if (window.confirm(message)) {
      await deleteBlogMutation.mutateAsync(blog)
    }
  }

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
              onClick={() => likeBlog(blog)}
              onDelete={() => deleteBlog(blog)}
            />
          ))}
        </ul>
      )}
    </>
  )
}
export default Blogs
