import { useState } from 'react'
import PropTypes from 'prop-types'
import PageTemplate from './PageTemplate'
import templateStyles from './PageTemplate.module.scss'
import { translator } from '@globalHelpers/translations'
import PlayerHeader from '@components/headers/playerHeader1/PlayerHeader' // Corrected import path

function Page({ pageId, isVisible }) {
  const [selectedButton, setSelectedButton] = useState('public')

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType)
  }

  return (
    <PageTemplate pageId={pageId} isVisible={isVisible} header={PlayerHeader}>
      <div className={templateStyles.container}>
        <div className={`${templateStyles.button} ${selectedButton === 'public' ? templateStyles.selected : templateStyles.notSelected}`}>
          <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>{translator('poolName')}</div>
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
    </PageTemplate>
  )
}

Page.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  pageId: PropTypes.string.isRequired,
}

export default Page
