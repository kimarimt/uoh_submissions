import express from 'express';
import morgan from 'morgan';

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

const PORT = 3001;
const app = express();

const generateId = () => {
  return Math.floor(Math.random() * (100000 - contacts.length));
};

app.use(express.json());

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req, res) => {
      return req.method !== 'POST';
    },
  })
);

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});

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
  res.json(contacts);
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
  const names = contacts.map((contact) => contact.name);

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number is missing',
    });
  }

  if (names.includes(body.name)) {
    return res.status(400).json({
      error: 'name must be unique',
    });
  }

  const contact = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  contacts = contacts.concat(contact);

  res.json(contact);
});

app.delete('/api/contacts/:id', (req, res) => {
  const id = req.params.id;
  contacts = contacts.filter((contact) => contact.id !== id);

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`[server]: listening at http://localhost:${PORT}`);
});
