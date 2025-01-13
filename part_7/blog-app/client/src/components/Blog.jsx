import { useState } from 'react'
import { useMutations } from '../hooks/blogs'
import { useUserValue } from './UserContext'

const Blog = ({ blog }) => {
  const currentUser = useUserValue()
  const [toggle, setToggle] = useState(false)
  const { updateBlogMutation, deleteBlogMutation } = useMutations()
  const { title, author, url, likes, user } = blog
  const label = toggle ? 'Hide' : 'Show'

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
    <li>
      <div className='blog-tile'>
        <p className='blog-title'>
          {title} | {author}
          <button onClick={() => setToggle(!toggle)}>{label} Info</button>
        </p>
        {toggle && (
          <div className='blog-detail'>
            <hr />
            <a href={url} target='_blank'>
              {url}
            </a>
            <p>
              Likes: <span data-testid='likes'>{likes}</span>
              <button onClick={() => likeBlog(blog)}>Like</button>
            </p>
            <p>{user.name}</p>
            {currentUser.name === user.name && (
              <button onClick={() => deleteBlog(blog)}>Delete</button>
            )}
          </div>
        )}
      </div>
    </li>
  )
}

export default Blog
