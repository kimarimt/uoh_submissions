import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

export const ancedotesSlice = createSlice({
  name: 'ancedotes',
  initialState: [],
  reducers: {
    castVote: (state, action) => {
      const anecdoteToChange = state.find(
        anecdote => anecdote.id === action.payload
      )

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state
        .map(anecdote => anecdote.id !== action.payload ? anecdote : changedAnecdote)
    },
    addAnecdote: (state, action) => {
      return [...state, action.payload]
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAllAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = text => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createAnecdote(text)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const updateVotes = (id, newObj) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.addVote(id, newObj)
    dispatch(castVote(newAnecdote.id))
  }
}

export const { castVote, addAnecdote, setAnecdotes } = ancedotesSlice.actions
export default ancedotesSlice.reducer