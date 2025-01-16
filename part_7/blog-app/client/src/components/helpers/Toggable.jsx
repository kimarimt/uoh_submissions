import { Box, Button, Typography } from '@mui/material'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggable = forwardRef(({ buttonLabel, heading, children }, refs) => {
  const [isVisible, setIsVisible] = useState(false)
  const hideWhenVisible = { display: isVisible ? 'none' : '' }
  const showWhenVisible = { display: isVisible ? '' : 'none' }

  useImperativeHandle(refs, () => {
    return {
      toggle,
    }
  })

  const toggle = () => {
    setIsVisible(!isVisible)
  }

  return (
    <Box>
      <Box component='div' style={hideWhenVisible}>
        <Button variant='contained' onClick={toggle}>{buttonLabel}</Button>
      </Box>
      <Box style={showWhenVisible}>
        <Typography variant='h6' sx={{ mb: 2 }} >{heading}</Typography >
        {children}
        <Button variant='contained' color='error' onClick={toggle}>Cancel</Button>
      </Box>
    </Box>
  )
})

Toggable.displayName = 'Togglable'

export default Toggable
