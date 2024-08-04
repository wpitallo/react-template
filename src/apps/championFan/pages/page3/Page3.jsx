import PropTypes from 'prop-types'
import PageTemplate from '../PageTemplate'
import templateStyles from '../PageTemplate.module.scss'
import { translator } from '@globalHelpers/translations'
import PlayerHeader from '@components/headers/playerHeader1/PlayerHeader'
import DefaultButton from '@components/buttons/defaultButton/DefaultButton'

function Page({ pageId, isVisible }) {
  return (
    <PageTemplate pageId={pageId} isVisible={isVisible} header={PlayerHeader}>
      <div className={`${templateStyles.container}`}>
        <DefaultButton onClick={() => {}} label="join" style="default" />
        <DefaultButton onClick={() => {}} label="create" style="default" />
      </div>

      <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('featuredPools')}</div>
      <div className={`${templateStyles.contentHeader2}`}>{translator('featuredPoolsSubHeading')}</div>

      <div className={templateStyles.container}>
        <div className={`${templateStyles.square} ${templateStyles}`}>
          <div className={templateStyles.squareContent}>
            <div className={templateStyles.comingSoon}>&nbsp;</div>
            <div className={templateStyles.sportName}>{translator('')}</div>
            <div className={templateStyles.comingSoon}>&nbsp;</div>
          </div>
        </div>

        <div className={`${templateStyles.square} ${templateStyles}`}>
          <div className={templateStyles.squareContent}>
            <div className={templateStyles.comingSoon}>&nbsp;</div>
            <div className={templateStyles.sportName}>{translator('')}</div>
            <div className={templateStyles.comingSoon}>{translator('')}</div>
          </div>
        </div>

        <div className={`${templateStyles.square} ${templateStyles}`}>
          <div className={templateStyles.squareContent}>
            <div className={templateStyles.comingSoon}>&nbsp;</div>
            <div className={templateStyles.sportName}>{translator('')}</div>
            <div className={templateStyles.comingSoon}>{translator('')}</div>
          </div>
        </div>
      </div>

      <div className={templateStyles.container}></div>

      <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('sports')}</div>
      <div className={templateStyles.contentHeader2}>{translator('sportsSubHeading')}</div>

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
      </div>

      <div className={templateStyles.container}>
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

        <div className={`${templateStyles.square} ${templateStyles.squareBaseball}`}>
          <div className={templateStyles.squareContent}>
            <div className={templateStyles.comingSoon}>&nbsp;</div>
            <div className={templateStyles.sportName}>{translator('baseball')}</div>
            <div className={templateStyles.comingSoon}>{translator('comingSoon')}</div>
          </div>
        </div>
      </div>

      <div className={templateStyles.container}>
        <div className={`${templateStyles.square} ${templateStyles.squareIceHockey}`}>
          <div className={templateStyles.squareContent}>
            <div className={templateStyles.comingSoon}>&nbsp;</div>
            <div className={templateStyles.sportName}>{translator('iceHockey')}</div>
            <div className={templateStyles.comingSoon}>{translator('comingSoon')}</div>
          </div>
        </div>

        <div className={`${templateStyles.square} ${templateStyles.squareAfl}`}>
          <div className={templateStyles.squareContent}>
            <div className={templateStyles.comingSoon}>&nbsp;</div>
            <div className={templateStyles.sportName}>{translator('afl')}</div>
            <div className={templateStyles.comingSoon}>{translator('comingSoon')}</div>
          </div>
        </div>

        <div className={`${templateStyles.square} ${templateStyles.squareAmericanFootball}`}>
          <div className={templateStyles.squareContent}>
            <div className={templateStyles.comingSoon}>&nbsp;</div>
            <div className={templateStyles.sportName}>{translator('americanFootball')}</div>
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
