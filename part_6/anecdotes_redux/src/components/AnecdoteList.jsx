import { useEffect } from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import Anecdote from './Anecdote'
import { initializeAnecdotes, updateVotes } from '../features/ancedotesSlice'
import { toggleNotification } from '../features/notificationSlice'

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

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const addVote = id => {
    const anecdote = selectorResult.find(anecdote => anecdote.id === id)

    const newObj = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    dispatch(updateVotes(anecdote.id, newObj))

    const message = `You voted '${anecdote.text.slice(0, 20)}'`
    dispatch(toggleNotification(message, 3000))
  }

  return (
    <ul>
      {selectorResult.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVotes={() => addVote(anecdote.id)}
        />
      )}
    </ul>
  )
}

export default AnecdoteList