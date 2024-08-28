import PropTypes from 'prop-types'
import { translator } from '@helpers/translations'

import templateStyles from '../Button.module.scss'

const CheckButton = ({ buttonTextTranslationKey, isSelected, onClick }) => (
  <div className={`${templateStyles.button} ${isSelected ? templateStyles.selected : templateStyles.notSelected}`} onClick={onClick}>
    <div className={`${templateStyles.centeredText} ${templateStyles.largeText}`}>{translator(buttonTextTranslationKey)}</div>
  </div>
)

CheckButton.propTypes = {
  buttonTextTranslationKey: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default CheckButton
