import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => {
      state = action.payload
      return state
    },
    resetNotification: (state) => {
      state = null
      return state
    }
  }
})

export const { setNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer