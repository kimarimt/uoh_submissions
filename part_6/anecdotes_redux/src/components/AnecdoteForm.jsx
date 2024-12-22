import { useDispatch } from 'react-redux'
import { addAnecdote } from '../features/ancedotesSlice'
import { setNotification, resetNotification } from '../features/notificationSlice'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = event => {
    event.preventDefault()
    const text = event.target.text.value
    dispatch(addAnecdote(text))
    toggleNotification(text)
    event.target.text.value = ''
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