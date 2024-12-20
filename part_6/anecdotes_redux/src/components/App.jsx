import { useSelector, useDispatch } from 'react-redux'
import { castVote } from '../features/ancedotesSlice'

const App = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const dispatch = useDispatch()

  const updateVote = (id) => {
    dispatch(castVote(id))
  }

  return (
    <div>
      <h1>Ancedotes</h1>
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