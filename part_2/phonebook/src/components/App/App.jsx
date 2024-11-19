import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ContactForm from '../ContactForm/ContactForm';
import ContactsDisplay from '../ContactsDisplay/ContactsDisplay';
import Section from '../Section/Section';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter((contact) =>
    contact.name.includes(searchTerm)
  );

  const addNewContact = (event) => {
    const contactExists = contacts.some(
      (contact) => contact.name === newContact
    );

    if (contactExists) {
      const message = `${newContact} is aleady added to phonebook.`;
      alert(message);
      return;
    }

    event.preventDefault();
    const contact = {
      id: String(contacts.length + 1),
      name: newContact,
      phone: newPhone,
    };
    setContacts(contacts.concat(contact));
    setNewContact('');
    setNewPhone('');
  };

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
        <ContactsDisplay contacts={filteredContacts} />
      </Section>
    </>
  );
};

export default App;
