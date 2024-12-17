import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ title, buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useImperativeHandle(refs, () => {
    return {
      toggle
    }
  })

  const toggle = () => {
    setVisible(!visible)
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggle}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <h2>{title}</h2>
        {children}
        <br />
        <button onClick={toggle}>Cancel</button>
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  title: PropTypes.string,
  buttonLabel: PropTypes.string,
  children: PropTypes.node
}

export default Togglable
