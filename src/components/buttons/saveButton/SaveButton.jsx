import PropTypes from 'prop-types'

import { useState } from 'react'
import templateStyles from '../Button.module.scss'
import style from './SaveButton.module.scss'
import Loader from '@components/loaders/<<componentConfig.saveButtonLoader.key>>/Loader'
import { translator } from '@globalHelpers/translations'

const SaveButton = ({ handleSaveClick, buttonTextTranslationKey, icon }) => {
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
      {!isSavingAnimationVisible && (
        <div className={`${templateStyles.centeredText} ${templateStyles.largeText} ${!buttonTextTranslationKey ? style.noText : ''} ${icon}`}>
          {translator(buttonTextTranslationKey)}
        </div>
      )}
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
  buttonTextTranslationKey: PropTypes.string,
  icon: PropTypes.string,
}

export default SaveButton
