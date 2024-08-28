import PropTypes from 'prop-types'
import { translator } from '@helpers/translations'
import templateStyles from '../Button.module.scss'
import styles from './DefaultButton.module.scss'

const DefaultButton = ({ onClick, buttonTextTranslationKey, iconClass, buttonClass, iconPosition = 'left', halfWidth = false }) => {
  // Determine if the icon styles should be applied
  const iconStyles = buttonTextTranslationKey ? styles.iconLeft : ''

  // Conditionally apply the halfWidth class
  const buttonStyles = `${templateStyles.button} ${templateStyles[buttonClass]} ${halfWidth ? templateStyles.halfWidth : ''}`

  return (
    <div className={buttonStyles} onClick={onClick}>
      <div className={`${templateStyles.centeredText} ${templateStyles.largeText} ${styles.iconButton}`}>
        {iconPosition === 'left' && iconClass && <span className={`${iconClass} ${iconStyles}`}></span>}
        {translator(buttonTextTranslationKey)}
        {iconPosition === 'right' && iconClass && <span className={`${iconClass} ${iconStyles}`}></span>}
      </div>
    </div>
  )
}

DefaultButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonTextTranslationKey: PropTypes.string,
  iconClass: PropTypes.string,
  buttonClass: PropTypes.string.isRequired,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  halfWidth: PropTypes.bool,
}

export default DefaultButton
