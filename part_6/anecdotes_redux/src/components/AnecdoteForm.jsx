import { useDispatch } from 'react-redux'
import { createAnecdote } from '../features/ancedotesSlice'
import { toggleNotification } from '../features/notificationSlice'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()

    const text = event.target.text.value
    event.target.text.value = ''
    dispatch(createAnecdote(text))

    const message = `You added '${text.slice(0, 20)}...'`
    dispatch(toggleNotification(message, 3000))
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name='text' />
      <button type='submit'>Add</button>
    </form>
  )
}

export default AnecdoteForm