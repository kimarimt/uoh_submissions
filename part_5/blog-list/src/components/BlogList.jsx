const BlogList = ({ blogs }) => (
  <div>
    {blogs.length !== 0 ? (
      <>
        <h2>Blog List</h2>
        {blogs.map((blog) => (
          <p key={blog.id}>
            {blog.title} {blog.author}
          </p>
        ))}
      </>
    ) : (
      <p>
        <strong>No blogs yet! Add one using the form above</strong>
      </p>
    )}
  </div>
);

export default BlogList;
