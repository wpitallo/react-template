import PropTypes from 'prop-types'

import { useState } from 'react'
import templateStyles from '../Button.module.scss'
import style from './SaveButton.module.scss'
import Loader from '@components/loaders/<<componentConfig.saveButtonLoader.key>>/Loader'

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
        <div className={`${style.saveAnimationWrapper}`}>
          <Loader />
        </div>
      )}
    </div>
  )
}

SaveButton.propTypes = {
  handleSaveClick: PropTypes.func.isRequired,
}

export default SaveButton
