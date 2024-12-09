import BlogTile from './BlogTile';

const BlogList = ({ blogs, handleUpdate, name }) => {
  return (
    <>
      {blogs.length !== 0 ? (
        <>
          <h2>Blog List</h2>
          {blogs.map((blog) => (
            <BlogTile
              key={blog.id}
              blog={blog}
              name={name}
              onClick={() => handleUpdate(blog.id)}
            />
          ))}
        </>
      ) : (
        <p>
          <strong>No blogs yet! Add one using the form above</strong>
        </p>
      )}
    </>
  );
};

export default BlogList;
