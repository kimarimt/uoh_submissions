import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogTile = ({ blog, currentUser, onUpdate, onDelete }) => {
  const [showDetail, setShowDetail] = useState(false)
  const { title, author, url, likes, user } = blog

  return (
    <>

      <div className='blog-tile'>
        <p className='blog-title'>
          <span className='title'>{title}</span> | <span className='author'>{author}</span>
          <button className='show-detail' onClick={() => setShowDetail(!showDetail)}>
            {showDetail ? 'Hide' : 'Show'} Info
          </button>
        </p>
        <div className="blog-details" style={{ display: showDetail ? 'block' : 'none' }}>
          <hr />
          <a className="blog-url" target='blank' href={url}>
            {url}
          </a>
          <p className="blog-likes">
            Likes: <span data-testid='likes' className='likes'>{likes}</span> <button onClick={onUpdate}>Like</button>
          </p>
          <p>{user.name}</p>
          { user.name === currentUser && ( <button onClick={onDelete}>Delete</button> ) }
        </div>
      </div>
    </>
  )
}

BlogTile.propTypes = {
  blog: PropTypes.object,
  currentUser: PropTypes.string,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
}

export default BlogTile
