import PropTypes from 'prop-types'
import { translator } from '@globalHelpers/translations'

import templateStyles from '../Button.module.scss'

const CheckButton = ({ label, isSelected, onClick }) => (
  <div className={`${templateStyles.button} ${isSelected ? templateStyles.selected : templateStyles.notSelected}`} onClick={onClick}>
    <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>{translator(label)}</div>
  </div>
)

CheckButton.propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default CheckButton
