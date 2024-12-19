import { configureStore } from '@reduxjs/toolkit'
import reviewsReducer from '../features/reviews/reviewsSlice'

const store = configureStore({
  reducer: {
    reviews: reviewsReducer
  },
})

export default store