import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogTile = ({ blog, name, onUpdate, onDelete }) => {
  const [showDetail, setShowDetail] = useState(false)
  const { title, author } = blog
  const currentUser = JSON.parse(
    window.localStorage.getItem('blogListUser')
  ).name

  return (
    <>
      <div className='blog-tile'>
        <p className='blog-title'>
          {title} | <span>{author}</span>{' '}
          <button onClick={() => setShowDetail(!showDetail)}>
            {showDetail ? 'Hide' : 'Show'} Info
          </button>
        </p>
        <div style={{ display: showDetail ? 'block' : 'none' }}>
          <hr />
          <a target='blank' href={blog.url}>
            {blog.url}
          </a>
          <p>
            Likes: {blog.likes} <button onClick={onUpdate}>Like</button>
          </p>
          <p>{name}</p>
          {blog.user.name === currentUser && (
            <button onClick={onDelete}>Delete</button>
          )}
        </div>
      </div>
    </>
  )
}

BlogTile.propTypes = {
  blog: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default BlogTile
