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

  const updateBlogLikes = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    blogService
      .update(id, updatedBlog)
      .then((changedBlog) => {
        console.log(changedBlog);
        setBlogs(blogs.map((blog) => (blog.id === id ? changedBlog : blog)));
        alertUser(`${blog.title} by ${blog.author} gets one like!`, 'green');
      })
      .catch((error) => {
        const message = error.response.data.error;
        alertUser(message, 'red');
      });
  };

  return (
    blogs && (
      <div>
        <p>
          {name} is logged in <button onClick={handleLogout}>logout</button>
        </p>
        <Toggable title='Add a new blog' buttonLabel='Add Blog'>
          <BlogForm addBlog={addBlog} />
        </Toggable>
        <BlogList blogs={blogs} handleUpdate={updateBlogLikes} name={name} />
      </div>
    )
  );
};

export default HomePage;
