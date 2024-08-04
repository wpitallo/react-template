import PropTypes from 'prop-types'
import templateStyles from '@pages/PageTemplate.module.scss'
import { useState } from 'react'

const SaveButton = ({ handleSaveClick }) => {
  const [isSavingAnimationVisible, setSavingAnimationVisible] = useState(false)

  const saving = () => {
    setSavingAnimationVisible(true)
  }

  const saved = () => {
    setSavingAnimationVisible(false)
  }

  const cancelSave = () => {
    setSavingAnimationVisible(false)
  }

  const handleClick = () => {
    saving()
    handleSaveClick(saved, cancelSave)
  }

  return (
    <div className={`${templateStyles.button} ${templateStyles.actionButton} ${templateStyles.halfWidth}`} onClick={handleClick}>
      {!isSavingAnimationVisible && <div className={`${templateStyles.centeredText} ${templateStyles.largeButton} icon-check`}></div>}
      {isSavingAnimationVisible && (
        <div className={`${templateStyles.saveAnimationWrapper}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="60" height="60" style={{ shapeRendering: 'auto', display: 'block' }}>
            <g>
              <path style={{ transform: 'scale(0.8)', transformOrigin: '50px 50px' }} strokeLinecap="round" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" strokeDasharray="42.76482137044271 42.76482137044271" strokeWidth="8" stroke="#043a0e" fill="none">
                <animate values="0;256.58892822265625" keyTimes="0;1" dur="1.3157894736842106s" repeatCount="indefinite" attributeName="stroke-dashoffset"></animate>
              </path>
            </g>
          </svg>
        </div>
      )}
    </div>
  )
}

SaveButton.propTypes = {
  handleSaveClick: PropTypes.func.isRequired,
}

export default SaveButton
