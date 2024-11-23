import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Contact from './models/contact.js';

let contacts = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.static('dist'));
app.use(cors());

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.get('/', (req, res) => {
  res.send('<h1>Hello, World!</h1>');
});

app.get('/info', (req, res) => {
  res.send(
    `<div><p>Phonebook has info for ${
      contacts.length
    } people</p><p>${new Date().toUTCString()}</p></div>`
  );
});

app.get('/api/contacts', (req, res) => {
  Contact.find({}).then((results) => {
    res.json(results);
  });
});

app.get('/api/contacts/:id', (req, res) => {
  const id = req.params.id;
  const contact = contacts.find((contact) => contact.id === id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({
      error: 'resource not found',
    });
  }
});

app.post('/api/contacts/', (req, res) => {
  const body = req.body;

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({
      error: 'name or number is missing',
    });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact.save().then((savedContact) => {
    res.json(savedContact);
  });
});

app.delete('/api/contacts/:id', (req, res) => {
  const id = req.params.id;
  contacts = contacts.filter((contact) => contact.id !== id);

  res.status(204).end();
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`[server]: listening at http://localhost:${PORT}`);
});
