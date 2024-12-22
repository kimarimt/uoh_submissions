import { createSelector } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { castVote } from '../features/ancedotesSlice'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const anecdotes = state => state.anecdotes
  const filter = state => state.filter

  const anecdoteSelector = createSelector([anecdotes, filter], (items, search) => {
    return [...items]
      .filter(item => item.text.includes(search))
      .sort((a, b) => b.votes - a.votes)
  })

  const result = useSelector(anecdoteSelector)
  const dispatch = useDispatch()

  const updateVote = id => {
    dispatch(castVote(id))
  }

  return (
    <ul>
      {result.map(anecdote =>
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