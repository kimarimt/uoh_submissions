import { createSlice } from '@reduxjs/toolkit'

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
    }
  }
})

export const { castVote, addAnecdote } = ancedotesSlice.actions
export default ancedotesSlice.reducer