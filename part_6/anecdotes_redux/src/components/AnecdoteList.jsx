import { createSelector } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { castVote } from '../features/ancedotesSlice'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
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
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVotes={() => updateVote(anecdote.id)}
        />
      )}
    </ul>
  )
}

export default AnecdoteList