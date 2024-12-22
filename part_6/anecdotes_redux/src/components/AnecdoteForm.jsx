import { useDispatch } from 'react-redux'
import { addAnecdote } from '../features/ancedotesSlice'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = event => {
    event.preventDefault()
    const text = event.target.text.value
    event.target.text.value = ''
    dispatch(addAnecdote(text))
  }

  return (
    <form onSubmit={createAnecdote}>
      <input name='text' />
      <button type="submit">Add</button>
    </form>
  )
}

export default AnecdoteForm