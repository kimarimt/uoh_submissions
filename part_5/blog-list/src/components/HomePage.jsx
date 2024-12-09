import { useState, useEffect } from 'react';
import BlogForm from './BlogForm';
import Toggable from './Togglable';
import blogService from '../services/blog';

const HomePage = ({ handleLogout, handleMessage, handleColor }) => {
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

    const blogObj = {
      title,
      author,
      url,
    };

    blogService
      .create(blogObj)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        handleMessage(`New blog ${title} by ${author} has been added`);
        handleColor('green');
        setTitle('');
        setAuthor('');
        setUrl('');

        setTimeout(() => {
          handleMessage(null);
          handleColor('');
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        handleMessage(error.response.data.error);
        handleColor('red');

        setTimeout(() => {
          handleMessage(null);
          handleColor('');
        }, 3000);
      });
  };

  return (
    <div>
      <p>
        logged in <button onClick={handleLogout}>logout</button>
      </p>
      <>
        <Toggable title='Add a new blog' buttonLabel='Add Blog'>
          <BlogForm
            title={title}
            author={author}
            url={url}
            handleNewBlog={handleNewBlog}
            handleTitle={({ target }) => setTitle(target.value)}
            handleAuthor={({ target }) => setAuthor(target.value)}
            handleUrl={({ target }) => setUrl(target.value)}
          />
        </Toggable>
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
          <p>
            <strong>No blogs yet! Add one using the form above</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
