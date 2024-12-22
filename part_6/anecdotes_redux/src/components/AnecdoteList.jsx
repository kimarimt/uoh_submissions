import { createSelector } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { castVote } from '../features/ancedotesSlice'
import { setNotification, resetNotification } from '../features/notificationSlice'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const anecdotes = state => state.anecdotes
  const filter = state => state.filter

  const anecdoteSelector = createSelector([anecdotes, filter], (items, search) => {
    return items
      .filter(item => item.text.includes(search))
      .sort((a, b) => b.votes - a.votes)
  })

  const selectorResult = useSelector(anecdoteSelector)
  const dispatch = useDispatch()

  const toggleNotification = text => {
    const message = `You voted '${text.slice(0, 20)}...'`

    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  const updateVote = id => {
    dispatch(castVote(id))
    const anecdote = selectorResult.find(anecdote => anecdote.id === id)
    toggleNotification(anecdote.text)
  }

  return (
    <ul>
      {selectorResult.map(anecdote =>
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