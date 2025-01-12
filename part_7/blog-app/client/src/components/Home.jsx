import { useEffect, useState, useRef } from 'react'
import Toggable from './Toggable'
import NewBlog from './NewBlog'
import Blogs from './Blogs'
import blogService from '../services/blog'
import { useToggleAlert } from './AlertContext'

const Home = ({ name, currentUser, handleLogout }) => {
  const [blogs, setBlogs] = useState(null)
  const blogFormRef = useRef()
  const toggleAlert = useToggleAlert()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialBlogs = await blogService.getAll()
        setBlogs(initialBlogs)
      } catch (err) {
        const message = err.response.data.error
        toggleAlert(message, 'red')
      }
    }

    fetchData()
  }, [])

  const addBlog = async newBlog => {
    try {
      const data = await blogService.createBlog(newBlog)
      const message = `New blog ${data.title} by ${data.author} has been added`

      setBlogs(blogs.concat(data))
      toggleAlert(message, 'green')
      blogFormRef.current.toggle()
    } catch (err) {
      const message = err.response.data.error
      toggleAlert(message, 'red')
    }
  }

  const addLike = async id => {
    try {
      const blog = blogs.find(b => b.id === id)
      const changedBlog = {
        ...blog,
        likes: blog.likes + 1,
      }
      const updatedBlog = await blogService.updateBlog(blog.id, changedBlog)

      setBlogs(
        blogs.map(existingBlog =>
          existingBlog.id === blog.id ? updatedBlog : existingBlog
        )
      )
    } catch (err) {
      const message = err.response.data.error
      toggleAlert(message, 'red')
    }
  }

  const deleteBlog = async id => {
    const blog = blogs.find(existingBlog => existingBlog.id === id)
    const message = `Remove blog ${blog.title} by ${blog.author}?`

    if (window.confirm(message)) {
      try {
        await blogService.deleteBlog(blog.id)
        toggleAlert(`${blog.title} by ${blog.author} has been deleted`, 'green')
        setBlogs(blogs.filter(blog => blog.id !== id))
      } catch (err) {
        const message = err.response.data.error
        toggleAlert(message, 'red')
      }
    }
  }

  return (
    <div>
      <p>
        {name} is logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Toggable buttonLabel='Add Blog' heading='Create Blog' ref={blogFormRef}>
        <NewBlog addBlog={addBlog} />
      </Toggable>
      {blogs && (
        <Blogs
          blogs={blogs}
          currentUser={currentUser}
          addLike={addLike}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default Home
