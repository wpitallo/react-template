import React from 'react'
import PropTypes from 'prop-types'
import styles from './Input.module.scss'

const Input = React.forwardRef(({ value, onChange, placeholder }, ref) => {
  return (
    <div className={`${styles.halfWidth}`}>
      <input type="text" value={value} onChange={onChange} placeholder={placeholder} className={styles.inputField} ref={ref} />
    </div>
  )
})

Input.displayName = 'Input'

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

export default Input
