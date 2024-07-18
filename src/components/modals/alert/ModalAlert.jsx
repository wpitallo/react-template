import PropTypes from 'prop-types'
import styles from './ModalAlert.module.scss'

function ModalAlert({ message }) {
  return (
    <div className={styles.modal}>
      <div className={`icon-information ${styles.information}`}></div>
      <div className={styles.modalContent}>{message}</div>
    </div>
  )
}

ModalAlert.propTypes = {
  message: PropTypes.string.isRequired,
}

export default ModalAlert
