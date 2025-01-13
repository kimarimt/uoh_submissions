import { createContext, useContext, useReducer } from 'react'

const initialState = {
  message: null,
  color: '',
}

const alertReducer = (state, action) => {
  switch (action.type) {
    case 'ALERT':
      return {
        message: action.message,
        color: action.color,
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

const AlertContext = createContext()

export const AlertContextProvider = ({ children }) => {
  const [alert, alertDispatch] = useReducer(alertReducer, 0)

  const toggleAlert = (message, color = 'green') => {
    alertDispatch({ type: 'ALERT', message, color })

    setTimeout(() => {
      alertDispatch({ type: 'RESET' })
    }, 3000)
  }

  return (
    <AlertContext.Provider value={[alert, toggleAlert]}>
      {children}
    </AlertContext.Provider>
  )
}

export const useAlertValue = () => {
  const contextValues = useContext(AlertContext)
  return contextValues[0]
}

export const useToggleAlert = () => {
  const contextValues = useContext(AlertContext)
  return contextValues[1]
}

export default AlertContext
