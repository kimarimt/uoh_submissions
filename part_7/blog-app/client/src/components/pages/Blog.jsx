import { Link, useNavigate } from 'react-router-dom'
import { useMutations } from '../../hooks/blog'
import { useUserValue } from '../contexts/UserContext'

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  const currentUser = useUserValue()
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
      navigate('/')
    }
  }

  const linkStyles = {
    display: 'block',
    margin: '1rem 0'
  }

  return (
    <>
      {blog && (
        <div>
          <h2>
            {blog.title} | {blog.author}
          </h2>
          <a href={blog.url} target='_blank'>
            {blog.url}
          </a>
          <p>
            Likes: <span data-testid='likes'>{blog.likes}</span>
            <button onClick={() => likeBlog(blog)}>Like</button>
          </p>
          <Link to={`/users/${blog.user.id}`} style={linkStyles}>{blog.user.name}</Link>
          {currentUser.name === blog.user.name && (
            <button onClick={() => deleteBlog(blog)}>Delete</button>
          )}
        </div>
      )}
    </>
  )
}

export default Blog
