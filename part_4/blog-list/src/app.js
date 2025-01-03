import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cors from 'cors'
import config from './utils/config.js'
import middleware from './utils/middleware.js'
import loginRouter from './controllers/login.js'
import usersRouter from './controllers/user.js'
import blogsRouter from './controllers/blog.js'
import testRouter from './controllers/testing.js'

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
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app