import { useField, useResource } from '../hooks'
import Section from './Section'

export default function NotesSection() {
  const content = useField('content', 'text')
  const [notes, notesService] = useResource('http://localhost:3001/notes')

  function addNote(event) {
    event.preventDefault()
    notesService.create({ content: content.value })
  }

  return (
    <Section heading='notes'>
      <form onSubmit={addNote}>
        <div>
          <label htmlFor='content'>content: </label>
          <input {...content} />
        </div>
        <button type='submit'>create</button>
      </form>
      <ul>
        { notes && (
          notes.map(note => <li key={note.id}>{note.content}</li>)
        )}
      </ul>
    </Section>
  )
}