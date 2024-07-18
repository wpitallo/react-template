import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import PageTemplate from './PageTemplate'
import templateStyles from './PageTemplate.module.scss'
import { translator } from '@globalHelpers/translations'
import PlayerHeader from '@components/headers/playerHeader1/PlayerHeader'
import ModalAlert from '@components/modals/alert/ModalAlert'

const generateShortGuid = () => {
  return Math.random().toString(36).substr(2, 8)
}

function Page({ pageId, isVisible }) {
  const [selectedButton, setSelectedButton] = useState('public')
  const [poolName, setPoolName] = useState('')
  const [guid, setGuid] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showShareLink, setShowShareLink] = useState(false)
  const inputRef = useRef(null)

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType)
    setShowShareLink(false) // Hide the share link button when a new selection is made
  }

  const handleInputChange = (event) => {
    setPoolName(event.target.value)
  }

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      inputRef.current.blur()
    }
  }

  const handleCreatePoolClick = () => {
    if (selectedButton === 'inviteOnly') {
      setGuid(generateShortGuid())
      setShowShareLink(true)
    }
  }

  const handleSendInvitationClick = (event) => {
    event.preventDefault()
    navigator.clipboard.writeText(`${window.CONFIG.appConfig.url}?invite=${guid}`)
    setShowModal(true)
    setTimeout(() => setShowModal(false), 2000) // Hide modal after 2 seconds
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const inviteUrl = `${window.CONFIG.appConfig.url}?invite=${guid}`

  return (
    <PageTemplate pageId={pageId} isVisible={isVisible} header={PlayerHeader}>
      <div className={templateStyles.container}>
        <div className={templateStyles.inputFieldWrapper}>
          <input type="text" value={poolName} onChange={handleInputChange} placeholder={translator('poolName')} className={templateStyles.inputField} ref={inputRef} />
        </div>
      </div>

      <div className={templateStyles.container}>
        <div className={`${templateStyles.button} ${selectedButton === 'public' ? templateStyles.selected : templateStyles.notSelected}`} onClick={() => handleButtonClick('public')}>
          <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>{translator('public')}</div>
        </div>
        <div className={`${templateStyles.button} ${selectedButton === 'inviteOnly' ? templateStyles.selected : templateStyles.notSelected}`} onClick={() => handleButtonClick('inviteOnly')}>
          <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>{translator('inviteOnly')}</div>
        </div>
      </div>

      {showModal && <ModalAlert message={translator('copiedToClipboard')} />}

      <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('sports')}</div>
      <div className={templateStyles.contentHeader2}>{translator('createPoolSportsSubHeading')}</div>

      <div className={templateStyles.container}>
        <div className={`${templateStyles.square} ${templateStyles.squareSoccer}`}>
          <div className={templateStyles.squareContent}>
            <div className={templateStyles.comingSoon}>&nbsp;</div>
            <div className={templateStyles.sportName}>{translator('soccer')}</div>
            <div className={templateStyles.comingSoon}>&nbsp;</div>
          </div>
        </div>

        <div className={`${templateStyles.square} ${templateStyles.squareRugby}`}>
          <div className={templateStyles.squareContent}>
            <div className={templateStyles.comingSoon}>&nbsp;</div>
            <div className={templateStyles.sportName}>{translator('rugby')}</div>
            <div className={templateStyles.comingSoon}>{translator('comingSoon')}</div>
          </div>
        </div>

        <div className={`${templateStyles.square} ${templateStyles.squareCricket}`}>
          <div className={templateStyles.squareContent}>
            <div className={templateStyles.comingSoon}>&nbsp;</div>
            <div className={templateStyles.sportName}>{translator('cricket')}</div>
            <div className={templateStyles.comingSoon}>{translator('comingSoon')}</div>
          </div>
        </div>

        <div className={`${templateStyles.square} ${templateStyles.squareTennis}`}>
          <div className={templateStyles.squareContent}>
            <div className={templateStyles.comingSoon}>&nbsp;</div>
            <div className={templateStyles.sportName}>{translator('tennis')}</div>
            <div className={templateStyles.comingSoon}>{translator('comingSoon')}</div>
          </div>
        </div>

        <div className={`${templateStyles.square} ${templateStyles.squareBasketball}`}>
          <div className={templateStyles.squareContent}>
            <div className={templateStyles.comingSoon}>&nbsp;</div>
            <div className={templateStyles.sportName}>{translator('basketball')}</div>
            <div className={templateStyles.comingSoon}>{translator('comingSoon')}</div>
          </div>
        </div>
      </div>

      {showShareLink && (
        <div>
          <div className={templateStyles.container}>
            <div className={`${templateStyles.container} ${templateStyles.centeredText}`}>
              <div className={templateStyles.guidText}>{inviteUrl}</div>
            </div>
          </div>
          <div className={templateStyles.container}>
            <div className={`${templateStyles.button} ${templateStyles.style2} ${templateStyles.halfWidth}`} onClick={handleSendInvitationClick}>
              <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>
                {translator('sendInvitation')}&nbsp;&nbsp;<span className="icon-send"> </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showShareLink && (
        <div className={templateStyles.container}>
          <div className={`${templateStyles.button} ${templateStyles.style2} ${templateStyles.halfWidth}`} onClick={handleCreatePoolClick}>
            <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>{translator('createPool')}</div>
          </div>
        </div>
      )}
    </PageTemplate>
  )
}

Page.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  pageId: PropTypes.string.isRequired,
}

export default Page
