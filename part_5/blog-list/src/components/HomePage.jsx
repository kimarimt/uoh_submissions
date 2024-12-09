import { useState, useEffect } from 'react';
import blogService from '../services/blog';

const HomePage = ({ user }) => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  if (blogs === null) {
    return;
  }

  return (
    <div>
      <h1>{user.name}&apos;s blogs</h1>
      <p>
        logged in <button>logout</button>
      </p>
      <br />
      <div>
        {blogs.map((blog) => (
          <p key={blog.id}>
            {blog.title} {blog.author}
          </p>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
