import { useNotificationValue } from '../hooks/notification'

const Notification = () => {
  const notification = useNotificationValue()

  return (
    <>
      {notification && (
        <div className="notification">{notification}</div>
      )}
    </>
  )
}

export default Notification