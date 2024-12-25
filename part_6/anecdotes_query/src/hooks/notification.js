import { useContext } from 'react'
import NotificationContext from '../components/NotificationContext'

export const toggleNotification = (dispatch, message, secs) => {
  dispatch({ type: 'SET_NOTIFICATION', payload: message })
  setTimeout(() => {
    dispatch({ type: 'RESET_NOTIFICATION' })
  }, secs)
}

export const useNotificationValue = () => {
  const value = useContext(NotificationContext)
  return value[0]
}

export const useNotificationDispatch = () => {
  const value = useContext(NotificationContext)
  return value[1]
}