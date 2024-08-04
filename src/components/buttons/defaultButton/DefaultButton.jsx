import PropTypes from 'prop-types'
import { translator } from '@globalHelpers/translations'
import templateStyles from '../Button.module.scss'
// import styles from './DefaultButton.module.scss'

const DefaultButton = ({ onClick, label, iconClass, style }) => {
  return (
    <div className={`${templateStyles.button} ${templateStyles[style]} ${templateStyles.halfWidth}`} onClick={onClick}>
      <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>
        {translator(label)}&nbsp;&nbsp;{iconClass && <span className={iconClass}></span>}
      </div>
    </div>
  )
}

DefaultButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
  style: PropTypes.string.isRequired,
}

export default DefaultButton
