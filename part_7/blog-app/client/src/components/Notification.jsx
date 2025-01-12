const Notification = ({ message, color }) => {
  return (
    <div className='message' style={{ color }}>
      {message}
    </div>
  )
}

export default Notification
