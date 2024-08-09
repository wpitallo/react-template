import { useState, useRef, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import PageTemplate from '../PageTemplate'
import templateStyles from '../PageTemplate.module.scss'
import PlayerHeader from '@components/headers/playerHeader1/PlayerHeader'
import { updateUserDocument } from '@services/userService'
import { DataContext } from '@providers/DataProvider'
import SaveButton from '@components/buttons/saveButton/SaveButton'
import Avatar from '@components/avatar/Avatar'
import AvatarEditor from '@components/avatar/AvatarEditor'
import { translator } from '@globalHelpers/translations'
import styles from './Page0.module.scss'
import Input from '@components/input/Input'
import IconButton from '@components/buttons/iconButton/IconButton'

function Page({ pageId, isVisible, exitMenuPage }) {
  const pageTemplateRef = useRef(null)
  const { user } = useContext(DataContext)
  const { userDoc, setUserDoc } = useContext(DataContext)
  const [saveClicked, setSaveClicked] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const inputRef = useRef(null)
  const avatarRef = useRef(null)
  const [isFormVisible, setFormVisible] = useState(false)
  const [updatedAvatarConfig, setUpdatedAvatarConfig] = useState({})

  useEffect(() => {
    if (isVisible && !userDoc.hasSignedUp) {
      if (user?.displayName) setDisplayName(user.displayName)
    } else {
      if (userDoc?.displayName) {
        setDisplayName(userDoc.displayName)
      } else {
        throw new Error('This should not happen error with displayName')
      }
    }
  }, [isVisible, userDoc?.displayName, user.displayName, userDoc.hasSignedUp])

  const handleAvatarEditCompleteClick = async () => {
    setFormVisible(!isFormVisible)
  }

  const handleSaveClick = async (saved, cancelSave) => {
    setSaveClicked(true)

    if (displayName.length <= 3) {
      inputRef.current.classList.add(templateStyles.validationFailed)
      cancelSave()
    }

    inputRef.current.classList.remove(templateStyles.validationFailed)

    if (user && user.uid) {
      try {
        await updateUserDocument(user.uid, displayName, JSON.stringify(updatedAvatarConfig), setUserDoc)
        setSaveClicked(false)
        exitMenuPage()
        setTimeout(() => saved(), 500)
      } catch (error) {
        console.error('Error updating user document:', error)
        cancelSave()
      }
    }
  }

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      inputRef.current.blur()
    }
  }

  const handleInputChange = (event) => {
    const newValue = event.target.value
    setDisplayName(newValue)

    if (saveClicked) {
      if (newValue.length > 2) {
        inputRef.current.classList.remove(templateStyles.validationFailed)
      } else {
        inputRef.current.classList.add(templateStyles.validationFailed)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <PageTemplate pageId={pageId} isVisible={isVisible} header={PlayerHeader} pageTopMarginStyle={'page0TopMarginStyle'} ref={pageTemplateRef} exitMenuPage={exitMenuPage}>
      <div className={templateStyles.container}>
        <div className={`${templateStyles.verticalContainer} ${templateStyles.avatarMarginTop}`}>
          <div className={templateStyles.avatarRow}>
            <div className={templateStyles.verticalContainerColumn}>
              <Avatar ref={avatarRef} setParentAvatarConfig={setUpdatedAvatarConfig} />
            </div>
          </div>

          <div className={`${templateStyles.verticalContainerRow} ${styles.iconButtonRow}`}>
            <div className={templateStyles.verticalContainerColumn}></div>
            <div className={templateStyles.verticalContainerColumn}>
              <IconButton iconClass="icon-swap" onClick={avatarRef.current?.randomizeAvatarConfig || (() => {})} />
            </div>
            <div className={templateStyles.verticalContainerColumn}>
              <IconButton iconClass={isFormVisible ? 'icon-check' : 'icon-edit'} onClick={handleAvatarEditCompleteClick} />
            </div>
            <div className={templateStyles.verticalContainerColumn}></div>
          </div>
          <div className={templateStyles.verticalContainerRow}>
            <Input value={displayName} onChange={handleInputChange} placeholder={translator('displayName')} ref={inputRef} />
          </div>
          <div className={templateStyles.verticalContainerRowSpacer}></div>
          {isFormVisible && (
            <div className={templateStyles.verticalContainerRow}>
              <AvatarEditor updatedAvatarConfig={updatedAvatarConfig} avatarRef={avatarRef} />
            </div>
          )}
          <div className={templateStyles.verticalContainerRow}>
            <SaveButton handleSaveClick={handleSaveClick} />
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}

Page.propTypes = {
  pageId: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  exitMenuPage: PropTypes.func.isRequired,
}

export default Page
