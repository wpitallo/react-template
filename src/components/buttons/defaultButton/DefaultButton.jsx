import PropTypes from 'prop-types'
import { translator } from '@globalHelpers/translations'
import templateStyles from '../Button.module.scss'
import styles from './DefaultButton.module.scss'

const DefaultButton = ({ onClick, label, iconClass, buttonClass, iconPosition = 'left' }) => {
  // Determine if the icon styles should be applied
  const iconStyles = label ? styles.iconLeft : ''

  return (
    <div className={`${templateStyles.button} ${templateStyles[buttonClass]} ${templateStyles.halfWidth}`} onClick={onClick}>
      <div className={`${templateStyles.centeredText} ${templateStyles.largeText} ${styles.iconButton}`}>
        {iconPosition === 'left' && iconClass && <span className={`${iconClass} ${iconStyles}`}></span>}
        {translator(label)}
        {iconPosition === 'right' && iconClass && <span className={`${iconClass} ${iconStyles}`}></span>}
      </div>
    </div>
  )
}

DefaultButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
  iconClass: PropTypes.string,
  buttonClass: PropTypes.string.isRequired,
  iconPosition: PropTypes.oneOf(['left', 'right']),
}

export default DefaultButton
