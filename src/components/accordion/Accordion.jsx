import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Accordion.module.scss'
import Modal from '@components/modals/fullScreen/ModalFullScreen'

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className={styles.accordion}>
        <div className={styles.accordionHeader}>
          <div className={`${styles.checkbox} ${isOpen ? 'icon-checked' : 'icon-unchecked'}`}></div>
          <span>{title}</span>
        </div>
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className={styles.accordionContent}>{children}</div>
        </Modal>
      )}
    </>
  )
}

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Accordion
