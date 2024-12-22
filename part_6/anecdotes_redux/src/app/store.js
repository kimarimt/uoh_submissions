import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from '../features/ancedotesSlice'
import filterReducer  from '../features/filterSlice'
import nofiticationReducer from '../features/notificationSlice'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    notification: nofiticationReducer
  }
})

export default store