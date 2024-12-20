import { useSelector, useDispatch } from 'react-redux'
import { castVote, addAnecdote } from '../features/ancedotesSlice'

const App = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const dispatch = useDispatch()

  const generateId = () =>
    Number((Math.random() * 1_000_000).toFixed(0))

  const updateVote = id => {
    dispatch(castVote(id))
  }

  const createAnecdote = event => {
    event.preventDefault()

    const text = event.target.text.value
    event.target.text.value = ''

    dispatch(addAnecdote(
      {
        id: generateId(),
        text,
        votes: 0
      }
    ))
  }

  return (
    <div>
      <h1>Ancedotes</h1>
      <form onSubmit={createAnecdote}>
        <input name='text' />
        <button type="submit">Add</button>
      </form>
      <ul>
        {anecdotes.map(anecdote => (
          <li key={anecdote.id}>
            <p>{anecdote.text}</p>
            <p>
              has {anecdote.votes} votes
              <button onClick={() => updateVote(anecdote.id)}>Vote</button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App