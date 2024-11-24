const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(404).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(404).send({ error: error.message })
  }

  next(error)
}

export default {
  unknownEndpoint,
  errorHandler
}