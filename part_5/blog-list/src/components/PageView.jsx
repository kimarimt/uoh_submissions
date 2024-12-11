import PropTypes from 'prop-types'

const PageView = ({ title, children }) => {
  return (
    <>
      <h1>{title}</h1>
      {children}
    </>
  )
}

PageView.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

export default PageView
