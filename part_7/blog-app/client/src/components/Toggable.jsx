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
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggle}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <h2>{heading}</h2>
        {children}
        <br />
        <button onClick={toggle}>Cancel</button>
      </div>
    </>
  )
})

Toggable.displayName = 'Togglable'

export default Toggable
