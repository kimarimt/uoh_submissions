const ContactForm = ({
  contact,
  number,
  handleContact,
  handleNumber,
  addNewContact,
}) => (
  <form onSubmit={addNewContact}>
    <div>
      <label htmlFor='name'>Name: </label>
      <input
        type='text'
        name='name'
        id='name'
        value={contact}
        onChange={handleContact}
        required
      />
    </div>
    <div>
      <label htmlFor='number'>Number: </label>
      <input
        type='tel'
        name='number'
        id='number'
        value={number}
        onChange={handleNumber}
        pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
        required
      />
    </div>
    <button type='submit'>add</button>
  </form>
);

export default ContactForm;
