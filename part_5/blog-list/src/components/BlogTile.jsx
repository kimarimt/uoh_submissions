import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogTile = ({ blog, name, currentUser, onUpdate, onDelete }) => {
  const [showDetail, setShowDetail] = useState(false)
  const { title, author, url, likes } = blog

  return (
    <>
      <div className='blog-tile'>
        <p className='blog-title'>
          <span className='title'>{title}</span> | <span className='author'>{author}</span>{' '}
          <button onClick={() => setShowDetail(!showDetail)}>
            {showDetail ? 'Hide' : 'Show'} Info
          </button>
        </p>
        <div className="blog-details" style={{ display: showDetail ? 'block' : 'none' }}>
          <hr />
          <a target='blank' href={url}>
            {url}
          </a>
          <p>
            Likes: {likes} <button onClick={onUpdate}>Like</button>
          </p>
          <p>{name}</p>
          { name === currentUser && ( <button onClick={onDelete}>Delete</button> ) }
        </div>
      </div>
    </>
  )
}

BlogTile.propTypes = {
  blog: PropTypes.object,
  name: PropTypes.string,
  currentUser: PropTypes.string,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
}

export default BlogTile
