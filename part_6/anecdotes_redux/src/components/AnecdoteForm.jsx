import { useDispatch } from 'react-redux'
import { addAnecdote } from '../features/ancedotesSlice'
import { setNotification, resetNotification } from '../features/notificationSlice'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = async event => {
    event.preventDefault()

    const text = event.target.text.value
    event.target.text.value = ''
    const newAnecdote = await anecdotesService.createAnecdote(text)

    dispatch(addAnecdote(newAnecdote))
    toggleNotification(text)
  }

  const toggleNotification = text => {
    const message = `You added '${text.slice(0, 20)}...'`

    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  return (
    <form onSubmit={createAnecdote}>
      <input name='text' />
      <button type='submit'>Add</button>
    </form>
  )
}

export default AnecdoteForm