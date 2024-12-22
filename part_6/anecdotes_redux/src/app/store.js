import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from '../features/ancedotesSlice'
import filterReducer  from '../features/filterSlice'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer
  }
})

export default store