import { configureStore } from '@reduxjs/toolkit'
import unicafeReducer from '../features/unicafe/unicafeSlice.test'

const store = configureStore({
  reducer: {
    unicafe: unicafeReducer
  },
})

export default store