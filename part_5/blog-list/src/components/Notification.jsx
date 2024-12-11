import PropTypes from 'prop-types'

const Notification = ({ message, color }) => {
  return (
    <div className='message' style={{ color }}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string
}

export default Notification
