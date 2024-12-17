import express from 'express'
import Blog from '../models/blog.js'
import middleware from '../utils/middleware.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  res.json(blog)
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const { url, title, author, likes } = req.body

  const blog = new Blog({
    url,
    title,
    author,
    user: req.user.id,
    likes
  })

  await blog.populate('user', { name: 1, username: 1 })
  const savedBlog = await blog.save()
  req.user.blogs = req.user.blogs.concat(savedBlog._id)
  await req.user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body

  const blog = {
    title,
    author,
    url,
    likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query'
  })

  res.json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (req.user.id.toString() !== blog.user.toString()) {
    return res.status(401).json({ error: 'unauthorized user' })
  }

  req.user.blogs.pull({ _id: blog.id })
  await req.user.save()
  await Blog.findByIdAndDelete(blog.id)

  res.status(204).end()
})

export default blogsRouter