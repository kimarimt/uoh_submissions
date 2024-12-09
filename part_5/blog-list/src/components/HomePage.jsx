import { useState, useEffect } from 'react';

import Toggable from './Togglable';
import BlogForm from './BlogForm';
import BlogList from './BlogList';

import blogService from '../services/blog';

const HomePage = ({ name, handleLogout, alertUser }) => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  if (blogs === null) {
    return;
  }

  const addBlog = ({ title, author, url }) => {
    const blogObj = {
      title,
      author,
      url,
    };

    blogService
      .create(blogObj)
      .then((result) => {
        const message = `New blog ${title} by ${author} has been added`;
        alertUser(message, 'green');
        setBlogs(blogs.concat(result));
      })
      .catch((error) => {
        const message = error.response.data.error;
        alertUser(message, 'red');
      });
  };

  return (
    <div>
      <p>
        {name} is logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Toggable title='Add a new blog' buttonLabel='Add Blog'>
        <BlogForm addBlog={addBlog} />
      </Toggable>
      <BlogList blogs={blogs} />
    </div>
  );
};

export default HomePage;
