import express from 'express'
import Blog from '../models/blog.js'
import Comment from '../models/comment.js'
import { userExtractor } from '../utils/middleware.js'

const blogsRouter = express.Router()
const options = {
  new: true,
  runValidators: true,
  context: 'query',
}

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { text: 1 })
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const blog = await Blog.findById(id)
  res.json(blog)
})

blogsRouter.get('/:id/comments', async (req, res) => {
  const { id } = req.params
  const blog = await Blog.findById(id)
    .populate('comments', { text: 1 })

  res.json(blog.comments)
})


blogsRouter.post('/', userExtractor, async (req, res) => {
  const { title, author, url } = req.body

  const newBlog = new Blog({
    title,
    author,
    user: req.user._id,
    url,
  })

  await newBlog.populate('user', { username: 1, name: 1 })

  const savedBlog = await newBlog.save()
  req.user.blogs.push(savedBlog._id)
  await req.user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const { id } = req.params

  const newComment = new Comment({
    ...req.body,
    blog: id
  })
  const savedComment = await newComment.save()
  const blog = await Blog.findById(id)

  blog.comments.push(savedComment._id)
  await blog.save()

  res.status(201).json(blog)
})


blogsRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, author, url, likes } = req.body

  const changedBlog = {
    title,
    author,
    url,
    likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, changedBlog, options)
  await updatedBlog.populate('user', { username: 1, name: 1 })

  res.json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const { id } = req.params
  const blog = await Blog.findById(id)

  if (!blog) {
    return res.status(400).send({ error: 'existing blog has been deleted' })
  }

  await Comment.deleteMany({ blog: blog.id })
  req.user.blogs.pull({ _id: blog.id })
  await req.user.save()
  await blog.deleteOne()
  res.status(204).end()
})

export default blogsRouter
