import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import fullScreen from './ModalFullScreen.module.scss'
import fullScreenDate from './ModalFullScreenDate.module.scss'
import IconButton from '@components/buttons/iconButton/IconButton'

const ModalFullScreen = ({ title, image, children, onClose, modalType }) => {
  const [modalStyle, setModalStyle] = useState(fullScreen)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (modalType === 'date') {
      setModalStyle(fullScreenDate)
    } else {
      setModalStyle(fullScreen)
    }
    setTimeout(() => setShowContent(true), 1)
  }, [modalType])

  return (
    showContent && (
      <div className={modalStyle.modal}>
        <div className={modalStyle.modalContent}>
          <div className={modalStyle.modalTopBar}>
            <div className={modalStyle.modalTopImageContainer}>
              <img className={modalStyle.modalTopImage} src={image} />
            </div>
            <span className={modalStyle.modalTitle}>{title}</span>
            <div className={modalStyle.closeButton}>
              <div className={modalStyle.closeButtonIconWrapper}>
                <IconButton iconClass="icon-close" onClick={onClose} />
              </div>
            </div>
          </div>

          <div className={modalStyle.children}>{children}</div>
        </div>
      </div>
    )
  )
}

ModalFullScreen.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  modalType: PropTypes.string,
}

export default ModalFullScreen
