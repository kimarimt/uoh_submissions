import { useAlertValue } from './AlertContext'
import { useUserValue } from './UserContext'
import Page from './Page'
import Notification from './Notification'
import Home from './Home'
import Login from './Login'

const App = () => {
  const user = useUserValue()
  const alert = useAlertValue()
  const title = user ? 'BlogApp Home Page' : 'BlogApp Login'

  return (
    <Page title={title}>
      {alert.message && <Notification message={alert.message} color={alert.color} />}
      {user ? (
        <Home
          name={user.name}
        />
      ) : (
        <Login />
      )}
    </Page>
  )
}

export default App
