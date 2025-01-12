import jwt from 'jsonwebtoken'
import Blog from '../models/blog.js'
import User from '../models/user.js'

export const initialBlogs = [
  {
    title: 'Self-Hosted Artificial Intelligence: Keeping Control of Your Data',
    author: 'Chris Maunder',
    url: 'https://www.codeproject.com/Articles/5372338/Self-Hosted-Artificial-Intelligence-Keeping-Contro',
  },
  {
    title:
      'Solving Real-World Problems with Self-Hosted AI: Unleashing the Potential in Your Applications',
    author: 'Chris Maunder',
    url: 'https://www.codeproject.com/Articles/5372335/Solving-Real-World-Problems-with-Self-Hosted-AI-Un',
  },
]

export const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

export const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

export const nonExistingId = async () => {
  const blog = new Blog({
    title: 'dummy title',
    author: 'dummy author',
    url: 'http://www.example.com',
  })

  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

export const getUser = async () => {
  const users = await usersInDb()
  return users[0]
}

export const getToken = ({ username, id }) => {
  const userForToken = {
    id,
    user: username,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })

  return token
}
