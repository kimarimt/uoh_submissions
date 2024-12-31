import { useField, useResource } from '../hooks'
import Section from './Section'


export default function ContactsSection() {
  const name = useField('name', 'type')
  const number = useField('number', 'phone')
  const [contacts, contactsService] = useResource('http://localhost:3001/contacts')

  function addContact(event) {
    event.preventDefault()
    contactsService.create({ name: name.value, number: number.value })
  }

  return (
    <Section heading='contacts'>
      <form onSubmit={addContact}>
        <div>
          <label htmlFor='name'>name: </label>
          <input {...name} />
        </div>
        <div>
          <label htmlFor='number'>number: </label>
          <input {...number} />
        </div>
        <button type="submit">add</button>
      </form>
      <ul>
        { contacts && (
          contacts.map(contact => <li key={contact.id}>{contact.name} {contact.number}</li>)
        )}
      </ul>
    </Section>
  )
}