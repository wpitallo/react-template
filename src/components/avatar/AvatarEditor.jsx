import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './AvatarEditor.module.scss'
import { getOptions, avatarOptions } from '@components/avatar/avatarOptions'
import { translator } from '@globalHelpers/translations'

const AvatarEditor = ({ updatedAvatarConfig, avatarRef }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalOptions, setModalOptions] = useState([])
  const [currentSelectName, setCurrentSelectName] = useState('')
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const modalRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isModalOpen && formRef.current) {
      const formRect = formRef.current.getBoundingClientRect()
      setModalPosition({
        top: formRect.bottom + window.scrollY + 10,
        left: formRect.left + window.scrollX,
      })
    }
  }, [isModalOpen])

  const openModal = (name) => {
    setModalOptions(getOptions(name))
    setCurrentSelectName(name)
    setModalOpen(true)
  }

  const handleModalOptionClick = (key) => {
    const newConfig = { ...updatedAvatarConfig, [currentSelectName]: key }
    avatarRef.current.updateAvatarConfig(newConfig)
    setModalOpen(false)
    setCurrentSelectName('')
  }

  return (
    <div style={{ width: '100%' }}>
      {isModalOpen && (
        <div style={{ top: modalPosition.top, left: modalPosition.left }}>
          <div className={styles.modalContent} ref={modalRef}>
            {modalOptions.map((option) => (
              <div key={option.key} className={styles.modalOption} onClick={() => handleModalOptionClick(option.key)}>
                {option.value}
              </div>
            ))}
          </div>
        </div>
      )}
      {!isModalOpen && (
        <div className={styles.avatarEditor}>
          <div className={styles.avatarOptions}>
            {avatarOptions.map(({ key, value }) => (
              <div className={styles.formGroup} key={key}>
                <label>
                  <div className={styles.labelContent}>
                    <span className={`${styles.labelText} ${styles.flexColum}`}>{value}</span>
                    <span className={`${styles.separator}`}>:</span>
                    <span onClick={() => openModal(key)} className={`${styles.selectBox} ${styles.flexColum}`}>
                      {getOptions(key).find((option) => option.key === updatedAvatarConfig[key])?.value || translator('select')}
                    </span>
                  </div>
                </label>
              </div>
            ))}
          </div>{' '}
        </div>
      )}
    </div>
  )
}

AvatarEditor.propTypes = {
  updatedAvatarConfig: PropTypes.object.isRequired,
  setUpdatedAvatarConfig: PropTypes.func.isRequired,
  avatarRef: PropTypes.object.isRequired,
}

export default AvatarEditor
