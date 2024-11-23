import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Contact from './models/contact.js';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.static('dist'));
app.use(cors());

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(404).send({ error: 'malformatted id' });
  }

  next(error);
};

app.get('/', (req, res) => {
  res.send('<h1>Hello, World!</h1>');
});

app.get('/info', (req, res, next) => {
  Contact.countDocuments().then((count) => {
    res.send(
      `<div><p>Phonebook has info for ${count} people</p><p>${new Date().toUTCString()}</p></div>`
    );
  })
  .catch(error => next(error));
});

app.get('/api/contacts', (req, res) => {
  Contact.find({}).then((results) => {
    res.json(results);
  });
});

app.get('/api/contacts/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      res.json(contact);
    })
    .catch((error) => next(error));
});

app.post('/api/contacts/', (req, res) => {
  const { name, number } = req.body;

  if (name === undefined || number === undefined) {
    return res.status(400).json({
      error: 'name or number is missing',
    });
  }

  const contact = new Contact({
    name,
    number,
  });

  contact.save().then((savedContact) => {
    res.json(savedContact);
  });
});

app.put('/api/contacts/:id', (req, res, next) => {
  const { name, number } = req.body;

  const modified = {
    name,
    number,
  };

  Contact.findByIdAndUpdate(req.params.id, modified, { new: true })
    .then((updatedContact) => {
      res.json(updatedContact);
    })
    .catch((error) => next(error));
});

app.delete('/api/contacts/:id', (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server]: listening at http://localhost:${PORT}`);
});
