import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ContactForm from '../ContactForm/ContactForm';
import ContactsDisplay from '../ContactsDisplay/ContactsDisplay';
import Section from '../Section/Section';
import Notification from '../Notification/Notification';
import contactService from '../../services/contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState('');

  useEffect(() => {
    contactService.getAllContacts().then((initialContacts) => {
      setContacts(initialContacts);
    });
  }, []);

  const toggleNotification = (message, color) => {
    setMessage(message);
    setColor(color);

    setTimeout(() => {
      setMessage(null);
      setColor('');
    }, 5000);
  };

  const notifyAndReset = (message, color) => {
    toggleNotification(message, color);
    setNewContact('');
    setNewNumber('');
  };

  const addNewContact = (event) => {
    const existingContact = contacts.find(
      (contact) => contact.name === newContact
    );

    event.preventDefault();

    if (existingContact !== undefined) {
      updateContact(existingContact);
    } else {
      const contact = {
        name: newContact,
        number: newNumber,
      };

      contactService
        .createContact(contact)
        .then((returnedObject) => {
          const notificationMsg = `Added ${returnedObject.name}`;
          setContacts(contacts.concat(returnedObject));
          notifyAndReset(notificationMsg, 'green')
        })
        .catch((error) => {
          toggleNotification(error.response.data.error, 'red');
        });
    }
  };

  const updateContact = (contact) => {
    const message = `${contact.name} is already added to the phonebook, replace the old number with a new one`;

    if (window.confirm(message)) {
      const updatedContact = { ...contact, number: newNumber };

      contactService
        .updateContact(contact.id, updatedContact)
        .then((returnedObject) => {
          const message = `Updated phone number for ${returnedObject.name}`;

          setContacts(
            contacts.map((c) => (c.id === contact.id ? returnedObject : c))
          );
          notifyAndReset(message, 'green');
        })
        .catch((error) => {
          toggleNotification(error.response.data.error, 'red');
        });
    }
  };

  const deleteContact = (id) => {
    const contact = contacts.find((contact) => contact.id === id);

    if (window.confirm(`Delete ${contact.name}`)) {
      contactService
        .deleteContact(id)
        .then(() => {
          setContacts(contacts.filter((contact) => contact.id !== id));
        })
        .catch(() => {
          const message = `Information of ${contact.name} has already been removed from server`;
          toggleNotification(message, 'red');
        });
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.includes(searchTerm)
  );

  return (
    <>
      <h1>Phonebook</h1>
      <Notification message={message} color={color} />
      <SearchBar
        term={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <Section heading='Add a New Contact'>
        <ContactForm
          contact={newContact}
          number={newNumber}
          handleContact={(event) => {
            setNewContact(event.target.value);
          }}
          handleNumber={(event) => {
            setNewNumber(event.target.value);
          }}
          addNewContact={addNewContact}
        />
      </Section>
      <Section heading='Contacts'>
        <ContactsDisplay contacts={filteredContacts} onClick={deleteContact} />
      </Section>
    </>
  );
};

export default App;
