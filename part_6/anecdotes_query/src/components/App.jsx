import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './services/anecdotes'

const App = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>anecdote service not available due to problems in server</span>
  }

  return (
    <div>
      <h1>Anecdote</h1>
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