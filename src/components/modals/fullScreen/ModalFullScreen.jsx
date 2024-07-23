import PropTypes from 'prop-types'
import styles from './ModalFullScreen.module.scss'
import MainHeader from '@components/headers/<<componentConfig.header.key>>/MainHeader'
import DateRangePicker from '@components/dateRangePicker/DateRangePicker'

const ModalFullScreen = ({ children, onClose }) => {
  return (
    <div className={styles.modal}>
      <MainHeader />
      <div className={styles.filter}>
        <div className={`${styles.closeButton} icon-close`} onClick={onClose}></div>
        <DateRangePicker />
      </div>
      <div className={styles.modalContent}>{children}</div>
    </div>
  )
}

ModalFullScreen.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ModalFullScreen
