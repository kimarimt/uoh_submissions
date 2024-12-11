import BlogTile from './BlogTile'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, name, currentUser, onUpdate, onDelete }) => {
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
              currentUser={currentUser}
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
  name: PropTypes.string,
  currentUser: PropTypes.string,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
}

export default BlogList
