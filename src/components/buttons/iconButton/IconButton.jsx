import PropTypes from 'prop-types'
import templateStyles from './IconButton.module.scss'

const IconButton = ({ iconClass, onClick }) => {
  return (
    <div className={`${templateStyles.iconButton} ${iconClass}`} onClick={onClick}>
      {' '}
    </div>
  )
}

IconButton.propTypes = {
  iconClass: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default IconButton
