import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote, getAnecdotes } from './services/anecdotes'

const App = () => {
  const queryClient = useQueryClient()

  const { isPending, isError, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient
        .setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>anecdote service not available due to problems in server</span>
  }

  return (
    <div>
      <h1>Anecdote</h1>
      <form onSubmit={addAnecdote}>
        <label htmlFor="content">Content</label>
        <input type="text" name="content" id="content" />
        <button>Add</button>
      </form>
      <ul>
        {data.map(({ id, content, votes }) => (
          <li key={id}>
            <p>{content}</p>
            <p>
              has {votes} votes
              <button>Vote</button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App