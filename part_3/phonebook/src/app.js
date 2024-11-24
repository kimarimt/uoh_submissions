import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import config from './utils/config.js'
import contactRouter from './controllers/contact.js'
import middleware from './utils/middleware.js'
import logger from './utils/logger.js'
import Contact from './models/contact.js'

const app = express()

mongoose.set('strictQuery', false)

logger.info('connecting to MongoDB database')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('database connection successful')
  })
  .catch(error => {
    logger.error('error connection to MongoDB', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())


app.use('/api/contacts', contactRouter)

app.get('/info', (req, res, next) => {
  Contact.countDocuments()
    .then((count) => {
      res.send(
        `<div><p>Phonebook has info for ${count} people</p><p>${new Date().toUTCString()}</p></div>`
      )
    })
    .catch((error) => next(error))
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app