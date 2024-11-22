const ContactsDisplay = ({ contacts, onClick }) => (
  <>
    {contacts.map((contact) => (
      <p key={contact.id}>
        {contact.name} {contact.number}{' '}
        <button onClick={() => onClick(contact.id)}>delete</button>
      </p>
    ))}
  </>
);

export default ContactsDisplay;
