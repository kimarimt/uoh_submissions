import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = ({ title, buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

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
}

Togglable.propTypes = {
  title: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Togglable
