import { useQueryClient } from '@tanstack/react-query'
import { useAnecdotesQuery, useUpdateAnecdoteMutation } from '../mutations/anecdotes'
import { toggleNotification, useNotificationDispatch } from '../hooks/notification'

const AnecdotesList = () => {
  const queryClient = useQueryClient()
  const result = useAnecdotesQuery()
  const dispatch = useNotificationDispatch()
  const updateAnecdoteMutation = useUpdateAnecdoteMutation(queryClient)

  const castVote = anecdote => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })

    const message = `anecdote '${anecdote.content.slice(0, 20)}...' voted`
    toggleNotification(dispatch, message, 3000)
  }

  if (result.isPending) {
    return <span>Loading...</span>
  }

  if (result.isError) {
    return <span>anecdote service not available due to problems in server</span>
  }

  return (
    <ul>
      {result.data.map(anecdote => (
        <li key={anecdote.id}>
          <p>{anecdote.content}</p>
          <p>
              has {anecdote.votes} votes
            <button onClick={() => castVote(anecdote)}>Vote</button>
          </p>
        </li>
      ))}
    </ul>
  )
}

export default AnecdotesList