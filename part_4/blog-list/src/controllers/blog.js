import express from 'express'
import Blog from '../models/blog.js'

const blogsRouter = express.Router()

blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

blogsRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)

  blog.save()
    .then(savedBlog => {
      res.json(savedBlog)
    })
    .catch(error => console.log(error.message))
})

export default blogsRouter