import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cors from 'cors'
import { mongoUri } from './utils/config.js'
import {
  errorHandler,
  tokenExtractor,
  unknownEndpointHandler,
} from './utils/middleware.js'
import loginRouter from './controllers/login.js'
import usersRouter from './controllers/user.js'
import blogsRouter from './controllers/blog.js'
import commentsRouter from './controllers/comments.js'
import testingRouter from './controllers/testing.js'

const app = express()

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('[server]: Connected to MongoDB database')
  })
  .catch(err => {
    console.error('[server]: Error connecting to MongoDb', err.message)
  })

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/blogs', blogsRouter)


if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(errorHandler)
app.use(unknownEndpointHandler)

export default app
