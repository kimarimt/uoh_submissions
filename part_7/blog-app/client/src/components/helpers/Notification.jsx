import { Alert } from "@mui/material"

const Notification = ({ message, severity }) => {
  return (
    <Alert sx={{ mx: 2, mt: 2 }} className='message' severity={severity}>
      {message}
    </Alert>
  )
}

export default Notification
