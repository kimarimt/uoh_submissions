import { createSelector } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { castVote } from '../features/ancedotesSlice'
import AnecdoteForm from './AnecdoteForm'

const App = () => {
  const sortedAnecdotesByVotes = createSelector(
    state => state.anecdotes,
    items => items.slice().sort((a, b) => b.votes - a.votes)
  )

  const anecdotes = useSelector(sortedAnecdotesByVotes)
  const dispatch = useDispatch()

  const updateVote = id => {
    dispatch(castVote(id))
  }

  return (
    <div>
      <h1>Ancedotes</h1>
      <AnecdoteForm />
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