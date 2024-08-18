import React from 'react'
import PropTypes from 'prop-types'
import styles from './Input.module.scss'

const Input = React.forwardRef(({ value, onChange, placeholder, isValid, errorText }, ref) => {
  return (
    <div className={styles.inputContainer}>
      <input type="text" value={value} onChange={onChange} placeholder={placeholder} className={`${styles.inputField} ${!isValid ? styles.validationFailed : ''}`} ref={ref} />
      {!isValid && errorText && <span className={styles.errorText}>{errorText}</span>}
    </div>
  )
})

Input.displayName = 'Input'

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  errorText: PropTypes.string,
}

export default Input
