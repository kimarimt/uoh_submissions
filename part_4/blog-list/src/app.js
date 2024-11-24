import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import config from './utils/config.js'
import blogsRouter from './controllers/blog.js'

const app = express()

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Database connection succesful')
  })
  .catch(error => {
    console.error('error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

export default app