import BlogTile from './BlogTile';

const BlogList = ({ blogs }) => (
  <>
    {blogs.length !== 0 ? (
      <>
        <h2>Blog List</h2>
        {blogs.map((blog) => (
          <BlogTile key={blog.id} blog={blog} />
        ))}
      </>
    ) : (
      <p>
        <strong>No blogs yet! Add one using the form above</strong>
      </p>
    )}
  </>
);

export default BlogList;
