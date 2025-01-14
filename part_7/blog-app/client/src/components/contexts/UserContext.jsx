import { createContext, useContext, useEffect, useReducer } from 'react'
import blogService from '../../services/blog'
import loginService from '../../services/login'
import { useToggleAlert } from './AlertContext'
import { useNavigate } from 'react-router-dom'

const initialState = null

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, initialState)
  const toggleAlert = useToggleAlert()
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('appUser')

    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser)
      userDispatch({ type: 'LOGIN', user: parsedUser })
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const login = async credentials => {
    try {
      const userData = await loginService.login(credentials)
      userDispatch({ type: 'LOGIN', user: userData })
      window.localStorage.clear()
      window.localStorage.setItem('appUser', JSON.stringify(userData))
      blogService.setToken(userData.setToken)
      navigate('/')
      document.location.reload()
    } catch (err) {
      toggleAlert(err.response.data.error, 'red')
    }
  }

  const logout = () => {
    userDispatch({ type: 'LOGOUT' })
    blogService.setToken(null)
    window.localStorage.removeItem('appUser')
    navigate('/login')
  }

  return (
    <UserContext.Provider value={[user, login, logout]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const contextValues = useContext(UserContext)
  return contextValues[0]
}

export const useLogin = () => {
  const contextValues = useContext(UserContext)
  return contextValues[1]
}

export const useLogout = () => {
  const contextValues = useContext(UserContext)
  return contextValues[2]
}

export default UserContext
