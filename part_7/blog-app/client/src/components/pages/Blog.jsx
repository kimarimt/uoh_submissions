import { Link, useNavigate } from 'react-router-dom'
import { useComments, useMutations } from '../../hooks/blog'
import { useUserValue } from '../contexts/UserContext'
import { useField } from '../../hooks'

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  const user = useUserValue()
  const { reset: textReset, ...commentText } = useField('text')
  const { updateBlogMutation, deleteBlogMutation, addCommentMutation } =
    useMutations()
  const { data: comments, isPending, error } = useComments(blog.id)

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

  const addComment = async event => {
    event.preventDefault()
    await addCommentMutation.mutateAsync({
      id: blog.id,
      text: commentText.value,
    })
    textReset()
  }

  const linkStyles = {
    display: 'block',
    margin: '1rem 0',
  }

  return (
    <>
      {blog && comments && (
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
          <Link to={`/users/${blog.user.id}`} style={linkStyles}>
            {blog.user.name}
          </Link>
          {error && <p>{error.message}</p>}
          {isPending && <p>Loading comments...</p>}

          <>
            <h3 className='heading'>Comments</h3>
            <form onSubmit={addComment}>
              <input placeholder='Add comment here...' {...commentText} />
              <button>Add comment</button>
            </form>
            {comments.length > 0 ? (
              <ul>
                {comments.map(comment => (
                  <li key={comment.id}>{comment.text}</li>
                ))}
              </ul>
            ) : (
              <p>No comments found...</p>
            )}
          </>
          {user.name === blog.user.name && (
            <button onClick={() => deleteBlog(blog)}>Delete</button>
          )}
        </div>
      )}
    </>
  )
}

export default Blog
