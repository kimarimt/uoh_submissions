const ContactForm = ({
  contact,
  phone,
  handleContact,
  handlePhone,
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
      <label htmlFor='phone'>Phone Number: </label>
      <input
        type='tel'
        name='phone'
        id='phone'
        value={phone}
        onChange={handlePhone}
        pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
        required
      />
    </div>
    <button type='submit'>add</button>
  </form>
);

export default ContactForm;
