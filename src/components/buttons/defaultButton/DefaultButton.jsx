import PropTypes from 'prop-types'
import { translator } from '@globalHelpers/translations'
import templateStyles from '../Button.module.scss'
// import styles from './DefaultButton.module.scss'

const DefaultButton = ({ onClick, label, iconClass, buttonClass }) => {
  return (
    <div className={`${templateStyles.button} ${templateStyles[buttonClass]} ${templateStyles.halfWidth}`} onClick={onClick}>
      <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>
        {translator(label)}
        {iconClass && <span className={iconClass}></span>}
      </div>
    </div>
  )
}

DefaultButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
  buttonClass: PropTypes.string.isRequired,
}

export default DefaultButton
