import { useQueryClient } from '@tanstack/react-query'
import { useNewAnecdoteMutation } from '../mutations/anecdotes'

const AnecdotesForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useNewAnecdoteMutation(queryClient)

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
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