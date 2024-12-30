import { useField } from '../hooks'

export default function SearchBar({ handleSubmit }) {
  const query = useField()

  function onSubmit(event) {
    event.preventDefault()
    handleSubmit(query.value)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='text' {...query} />
        <button type='submit'>search</button>
      </form>
    </div>
  )
}