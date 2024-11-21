const Notification = ({ message, color }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className='error' style={{ color }}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
