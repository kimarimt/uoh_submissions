import express from 'express'
import Comment from '../models/comment.js'

const commentsRouter = express.Router()

commentsRouter.get('/', async (req, res) => {
  const comments = await Comment.find({})
  res.json(comments)
})

export default commentsRouter