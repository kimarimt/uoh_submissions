import { createSlice } from '@reduxjs/toolkit'

export const ancedotesSlice = createSlice({
  name: 'ancedotes',
  initialState: [
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin fringilla mauris, eget tempor sem eleifend sit amet.',
      votes: 0
    },
    {
      id: 2,
      text: 'Proin condimentum consequat massa sit amet facilisis. Praesent nisi quam, finibus in laoreet id, pretium in odio',
      votes: 0
    }
  ],
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