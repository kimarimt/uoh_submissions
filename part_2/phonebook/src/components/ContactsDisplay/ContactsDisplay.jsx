const ContactsDisplay = ({ contacts }) => (
  <>
    {contacts.map((contact) => (
      <p key={contact.id}>{contact.name} {contact.phone}</p>
    ))}
  </>
);

export default ContactsDisplay;
