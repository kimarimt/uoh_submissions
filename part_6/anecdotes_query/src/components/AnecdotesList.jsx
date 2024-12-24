import { useQueryClient } from '@tanstack/react-query'
import { useAnecdotesQuery, useUpdateAnecdoteMutation } from '../mutations/anecdotes'

const AnecdotesList = () => {
  const queryClient = useQueryClient()
  const { isPending, isError, data } = useAnecdotesQuery()
  const updateAnecdoteMutation = useUpdateAnecdoteMutation(queryClient)

  const castVote = anecdote => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
  }

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>anecdote service not available due to problems in server</span>
  }

  return (
    <ul>
      {data.map(anecdote => (
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