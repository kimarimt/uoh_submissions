import jwt from 'jsonwebtoken'
import Blog from '../models/blog.js'
import User from '../models/user.js'

const initialBlogs = [
  {
    title: 'Testing Backend Application',
    author: 'John Smith',
    url: 'https://bloglist.fly.dev/jsmith/testing',
  },
  {
    title: 'Using Supertest to Test APIs',
    author: 'Jane Doe',
    url: 'https://bloglist.fly.dev/jsmith/supertest',
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'dummy title',
    author: 'dummy author',
    url: 'dummy url'
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const getUser = async () => {
  const user = await usersInDb()
  return user[0]
}

const getToken = user => {
  const userForToken = {
    user: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })

  return token
}

export default {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  getUser,
  getToken
}