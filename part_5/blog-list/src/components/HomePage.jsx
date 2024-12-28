import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import Toggable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

import blogService from '../services/blog'

const HomePage = ({ name, currentUser, handleLogout, alertUser }) => {
  const [blogs, setBlogs] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs)
    })
  }, [])

  const addBlog = ({ title, author, url }) => {
    const blogObj = {
      title,
      author,
      url,
    }

    blogFormRef.current.toggle()
    blogService
      .createBlog(blogObj)
      .then((result) => {
        const message = `New blog ${title} by ${author} has been added`
        alertUser(message, 'green')
        setBlogs(blogs.concat(result))
      })
      .catch((error) => {
        const message = error.response.data.error
        alertUser(message, 'red')
      })
  }

  const updateBlogLikes = (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .updateBlog(id, updatedBlog)
      .then((changedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id === id ? changedBlog : blog)))
      })
      .catch((error) => {
        const message = error.response.data.error
        alertUser(message, 'red')
      })
  }

  const deleteBlog = (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    const message = `Remove blog '${blog.title}' by ${blog.author}?`

    if (window.confirm(message)) {
      blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== id))
          alertUser('Blog successfully deleted', 'green')
        })
        .catch((error) => {
          const message = error.response.data.error
          alertUser(message, 'red')
        })
    }
  }

  return (
    blogs && (
      <div>
        <p>
          {name} is logged in <button onClick={handleLogout}>logout</button>
        </p>
        <Toggable title='Add a new blog' buttonLabel='Add Blog' ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Toggable>
        <BlogList
          blogs={blogs}
          currentUser={currentUser}
          onUpdate={updateBlogLikes}
          onDelete={deleteBlog}
        />
      </div>
    )
  )
}

HomePage.propTypes = {
  name: PropTypes.string,
  currentUser: PropTypes.string,
  handleLogout: PropTypes.func,
  alertUser: PropTypes.func
}

export default HomePage
