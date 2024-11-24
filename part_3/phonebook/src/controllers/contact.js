import express from 'express'
import Contact from '../models/contact.js'

const contactRouter = express.Router()

contactRouter.get('/', (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  })
})

contactRouter.get('/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      res.json(contact)
    })
    .catch((error) => next(error))
})

contactRouter.post('/', (req, res, next) => {
  const { name, number } = req.body

  const contact = new Contact({
    name,
    number,
  })

  contact
    .save()
    .then((savedContact) => {
      res.json(savedContact)
    })
    .catch((error) => next(error))
})

contactRouter.put('/:id', (req, res, next) => {
  const { name, number } = req.body

  const modified = {
    name,
    number,
  }

  Contact.findByIdAndUpdate(req.params.id, modified, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedContact) => {
      res.json(updatedContact)
    })
    .catch((error) => next(error))
})

contactRouter.delete('/:id', (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

contactRouter.get('/info', (req, res, next) => {
  Contact.countDocuments()
    .then((count) => {
      res.send(
        `<div><p>Phonebook has info for ${count} people</p><p>${new Date().toUTCString()}</p></div>`
      )
    })
    .catch((error) => next(error))
})

export default contactRouter