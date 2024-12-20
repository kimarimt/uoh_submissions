import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from '../features/ancedotesSlice'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer
  }
})

export default store