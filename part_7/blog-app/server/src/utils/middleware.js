import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const tokenExtractor = async (req, res, next) => {
  const auth = await req.get('Authorization')

  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '')
  } else {
    req.token = null
  }

  next()
}

export const userExtractor = async (req, res, next) => {
  if (!req.token) {
    req.user = null
  } else {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    req.user = await User.findById(decodedToken.id)
  }

  if (!req.user) {
    return res.status(401).send({ error: 'token invalid' })
  }

  next()
}

export const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError' && err.message.includes('required')) {
    const path = err.message.split(':')[1].trim()
    return res.status(400).send({ error: `${path} is required` })
  } else if (
    err.name === 'ValidationError' &&
    err.message.includes('minimum allowed length')
  ) {
    return res.status(400).send({ error: `username must a least 3 characters` })
  } else if (err.name === 'CastError') {
    return res.status(400).send({ error: err.message })
  } else if (
    err.name === 'MongoServerError' &&
    err.message.includes('username')
  ) {
    return res.status(400).send({ error: 'username must be unique' })
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).send({ error: 'token expired' })
  }

  next(err)
}

export const unknownEndpointHandler = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
