import { createSlice } from '@reduxjs/toolkit'

export const ancedotesSlice = createSlice({
  name: 'ancedotes',
  initialState: [
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non elit nibh. Nam justo purus, maximus sed tellus sit amet, aliquam elementum justo.',
      votes: 0
    },
    {
      id: 2,
      text: 'Ut facilisis a eros vel tincidunt. Nam euismod porta enim, id congue elit faucibus at. Curabitur aliquet commodo massa ac porttitor.',
      votes: 0
    },
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