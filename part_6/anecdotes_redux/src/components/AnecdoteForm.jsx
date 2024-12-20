import { useDispatch } from 'react-redux'
import { addAnecdote } from '../features/ancedotesSlice'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const generateId = () =>
    Number((Math.random() * 1_000_000).toFixed(0))

  const createAnecdote = event => {
    event.preventDefault()

    const text = event.target.text.value
    event.target.text.value = ''

    dispatch(addAnecdote(
      {
        id: generateId(),
        text,
        votes: 0
      }
    ))
  }

  return (
    <form onSubmit={createAnecdote}>
      <input name='text' />
      <button type="submit">Add</button>
    </form>
  )
}

export default AnecdoteForm