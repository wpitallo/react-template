import PropTypes from 'prop-types'
import styles from './SquareTextAndImageButton.module.scss'
import { translator } from '@globalHelpers/translations'
import templateStyles from '../Button.module.scss'

const SquareTextAndImageButton = ({ mainTextTranslationKey, isSelected, onClick, backgroundSvgIcon, secondTextTranslationKey, disabled }) => {
  const squareStyle = styles[backgroundSvgIcon]

  return (
    <div
      className={`${styles.square} ${secondTextTranslationKey ? styles.squareDisabled : ''} ${squareStyle} ${isSelected ? `${styles.selectedSquare} ${templateStyles.selected}` : ''}`}
      onClick={disabled ? null : onClick}
    >
      <div className={styles.squareContent}>
        <div className={styles.disabled}> &nbsp;</div>
        <div className={styles.mainText}>{translator(mainTextTranslationKey)}</div>
        <div className={styles.disabled}>{secondTextTranslationKey ? translator(secondTextTranslationKey) : '\u00A0'}</div>
      </div>
    </div>
  )
}

SquareTextAndImageButton.propTypes = {
  mainTextTranslationKey: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  backgroundSvgIcon: PropTypes.string,
  secondTextTranslationKey: PropTypes.string,
  disabled: PropTypes.bool,
}

export default SquareTextAndImageButton
