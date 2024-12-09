import { useState, useEffect } from 'react';
import BlogForm from './BlogForm';
import blogService from '../services/blog';

const HomePage = ({ user, handleLogout }) => {
  const [blogs, setBlogs] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  if (blogs === null) {
    return;
  }

  const handleNewBlog = (event) => {
    event.preventDefault();

    try {
      const blogObj = {
        title,
        author,
        url
      }

      blogService.create(blogObj).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
    } catch (exception) {
      console.error(exception)
    }
  };

  return (
    <div>
      <h1>{user.name}&apos;s blogs</h1>
      <p>
        logged in <button onClick={handleLogout}>logout</button>
      </p>
      <>
        <h2>Add new blog</h2>
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleNewBlog={handleNewBlog}
          handleTitle={({ target }) => setTitle(target.value)}
          handleAuthor={({ target }) => setAuthor(target.value)}
          handleUrl={({ target }) => setUrl(target.value)}
        />
      </>
      <br />
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
          <p><strong>No blogs yet! Add one using the form above</strong></p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
