import BlogTile from './BlogTile'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, name, onUpdate, onDelete }) => {
  const blogsByLikes = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <>
      {blogsByLikes.length !== 0 ? (
        <>
          <h2>Blog List</h2>
          {blogsByLikes.map((blog) => (
            <BlogTile
              key={blog.id}
              blog={blog}
              name={name}
              onUpdate={() => onUpdate(blog.id)}
              onDelete={() => onDelete(blog.id)}
            />
          ))}
        </>
      ) : (
        <p>
          <strong>No blogs yet! Add one using the form above</strong>
        </p>
      )}
    </>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default BlogList
