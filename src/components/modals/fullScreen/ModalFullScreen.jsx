import PropTypes from 'prop-types'
import styles from './ModalFullScreen.module.scss'
import MainHeader from '@components/headers/<<componentConfig.header.key>>/MainHeader'

import IconButton from '@components/buttons/iconButton/IconButton'

const ModalFullScreen = ({ children, onClose }) => {
  return (
    <div className={styles.modal}>
      <MainHeader />

      <div className={`${styles.closeButton}`}>
        <IconButton iconClass="icon-close" onClick={onClose} />
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
