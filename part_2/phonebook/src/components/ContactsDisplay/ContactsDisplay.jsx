const ContactsDisplay = ({ contacts, onClick }) => (
  <>
    {contacts.map((contact) => (
      <p key={contact.id}>
        {contact.name} {contact.phone}{' '}
        <button onClick={() => onClick(contact.id)}>delete</button>
      </p>
    ))}
  </>
);

export default ContactsDisplay;
