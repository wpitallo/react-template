import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Accordion.module.scss'

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionHeader} onClick={toggleAccordion}>
        <div className={`${styles.checkbox} ${isOpen ? 'icon-checked' : 'icon-unchecked'}`}></div>
        <span>{title}</span>
      </div>
      {isOpen && <div className={styles.accordionContent}>{children}</div>}
    </div>
  )
}

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Accordion
