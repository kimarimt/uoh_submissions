import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = new mongoose.model('Blog', blogSchema)

export default Blog