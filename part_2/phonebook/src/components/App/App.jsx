import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ContactForm from '../ContactForm/ContactForm';
import ContactsDisplay from '../ContactsDisplay/ContactsDisplay';
import Section from '../Section/Section';
import contactService from '../../services/contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    contactService.getAllContacts().then((initialContacts) => {
      setContacts(initialContacts);
    });
  }, []);

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
        phone: newPhone,
      };

      contactService.createContact(contact).then((returnedObject) => {
        setContacts(contacts.concat(returnedObject));
        setNewContact('');
        setNewPhone('');
      });
    }
  };

  const updateContact = (contact) => {
    const message = `${contact.name} is already added to the phonebook, replace the old number with a new one`;

    if (window.confirm(message)) {
      const updatedContact = { ...contact, phone: newPhone };

      contactService
        .updateContact(contact.id, updatedContact)
        .then((returnedObject) => {
          setContacts(
            contacts.map((c) => (c.id === contact.id ? returnedObject : c))
          );
        });
    }
  };

  const deleteContact = (id) => {
    const contact = contacts.find((contact) => contact.id === id);

    if (window.confirm(`Delete ${contact.name}`)) {
      contactService.deleteContact(id).then(() => {
        setContacts(contacts.filter((contact) => contact.id !== id));
      });
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.includes(searchTerm)
  );

  return (
    <>
      <h1>Phonebook</h1>
      <SearchBar
        term={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <Section heading='Add a New Contact'>
        <ContactForm
          contact={newContact}
          phone={newPhone}
          handleContact={(event) => {
            setNewContact(event.target.value);
          }}
          handlePhone={(event) => {
            setNewPhone(event.target.value);
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
