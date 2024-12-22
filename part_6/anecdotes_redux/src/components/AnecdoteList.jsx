import { useEffect } from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import Anecdote from './Anecdote'
import { castVote, setAnecdotes } from '../features/ancedotesSlice'
import { setNotification, resetNotification } from '../features/notificationSlice'
import anecdotesService from '../services/anecdotes'

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
    anecdotesService
      .getAllAnecdotes()
      .then(anecdotes => {
        dispatch(setAnecdotes(anecdotes))
      })
  }, [dispatch])

  const toggleNotification = text => {
    const message = `You voted '${text.slice(0, 20)}...'`

    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  const updateVote = async id => {
    const anecdote = selectorResult.find(anecdote => anecdote.id === id)

    const newObj = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const newAnecdote = await anecdotesService.addVote(anecdote.id, newObj)
    dispatch(castVote(newAnecdote.id))
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