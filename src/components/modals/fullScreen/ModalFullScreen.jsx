import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import fullScreen from './ModalFullScreen.module.scss'
import fullScreenDate from './ModalFullScreenDate.module.scss'
import MainHeader from '@components/headers/<<componentConfig.header.key>>/MainHeader'
import IconButton from '@components/buttons/iconButton/IconButton'

const ModalFullScreen = ({ children, onClose, modalType }) => {
  const [modalStyle, setModalStyle] = useState('modal')

  useEffect(() => {
    if (modalType === 'date') {
      setModalStyle(fullScreenDate)
    } else {
      setModalStyle(fullScreen)
    }
  }, [modalType]) // Depend on modalType to update styles when it changes

  return (
    <div className={`${modalStyle.modal}`}>
      {!modalType ? <MainHeader /> : <></>}

      <div className={`${modalStyle.modalContent}`}>
        <div className={`${modalStyle.closeButton}`}>
          <IconButton iconClass="icon-close" onClick={onClose} />
        </div>
        <div className={`${modalStyle.children}`}> {children}</div>
      </div>
    </div>
  )
}

ModalFullScreen.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  modalType: PropTypes.string,
}

export default ModalFullScreen
