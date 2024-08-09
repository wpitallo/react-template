import PropTypes from 'prop-types'
import styles from './SquareTextAndImageButton.module.scss'
import { translator } from '@globalHelpers/translations'
import templateStyles from '../Button.module.scss'

const SquareTextAndImageButton = ({ mainText, isSelected, onClick, backgroundSvgIcon, secondText, disabled }) => {
  const squareStyle = styles[backgroundSvgIcon]

  return (
    <div className={`${styles.square} ${secondText ? styles.squareDisabled : ''} ${squareStyle} ${isSelected ? `${styles.selectedSquare} ${templateStyles.selected}` : ''}`} onClick={disabled ? null : onClick}>
      <div className={styles.squareContent}>
        <div className={styles.disabled}> &nbsp;</div>
        <div className={styles.mainText}>{translator(mainText)}</div>
        <div className={styles.disabled}>{secondText ? translator(secondText) : '\u00A0'}</div>
      </div>
    </div>
  )
}

SquareTextAndImageButton.propTypes = {
  mainText: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  backgroundSvgIcon: PropTypes.string,
  secondText: PropTypes.string,
  disabled: PropTypes.bool,
}

export default SquareTextAndImageButton
