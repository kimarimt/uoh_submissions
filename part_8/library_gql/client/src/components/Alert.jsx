const Alert = ({ errorMessage }) => {
  return (
    <div style={{ backgroundColor: '#FFEAEB', color: 'red', margin: '1rem 0', padding: '1rem 0 1rem 1rem' }}>
      {errorMessage}
    </div>
  )
}

export default Alert
