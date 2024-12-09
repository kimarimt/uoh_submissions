import { useState } from 'react';

const BlogTile = ({ blog, name, onClick }) => {
  const [showDetail, setShowDetail] = useState(false);
  const { title, author } = blog;

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
            Likes: {blog.likes} <button onClick={onClick}>Like</button>
          </p>
          <p>{name}</p>
        </div>
      </div>
    </>
  );
};

export default BlogTile;
