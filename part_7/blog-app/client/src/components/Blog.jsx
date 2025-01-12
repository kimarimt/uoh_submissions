import { useState } from 'react'

const Blog = ({ blog, currentUser, onClick, onDelete }) => {
  const [toggle, setToggle] = useState(false)

  const { title, author, url, likes, user } = blog
  const label = toggle ? 'Hide' : 'Show'

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
              <button onClick={onClick}>Like</button>
            </p>
            <p>{user.name}</p>
            {currentUser === user.name && (
              <button onClick={onDelete}>Delete</button>
            )}
          </div>
        )}
      </div>
    </li>
  )
}

export default Blog
