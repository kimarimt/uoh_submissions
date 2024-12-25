import { useQueryClient } from '@tanstack/react-query'
import { useNewAnecdoteMutation } from '../mutations/anecdotes'
import { toggleNotification, useNotificationDispatch } from '../hooks/notification'

const AnecdotesForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newAnecdoteMutation = useNewAnecdoteMutation(queryClient)

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''

    if (content.length < 5) {
      const message = 'Anecdotes must be at least 5 characters long'
      toggleNotification(dispatch, message, 3000)
      return
    }

    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <form onSubmit={addAnecdote}>
      <label htmlFor="content">Content</label>
      <input type="text" name="content" id="content" />
      <button>Add</button>
    </form>
  )
}

export default AnecdotesForm