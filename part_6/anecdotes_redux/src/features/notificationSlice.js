import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
    resetNotification: () => {
      return null
    }
  }
})

export const toggleNotification = (message, secs) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(resetNotification())
    }, secs)
  }
}

export const { setNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer