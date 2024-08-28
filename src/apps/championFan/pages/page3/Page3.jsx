import PropTypes from 'prop-types'
import PageTemplate from '../PageTemplate'
import templateStyles from '../PageTemplate.module.scss'
import { translator } from '@helpers/translations'
import PlayerHeader from '@components/headers/playerHeader1/PlayerHeader'
import DefaultButton from '@components/buttons/defaultButton/DefaultButton'
import SquareTextAndImageButton from '@components/buttons/squareTextAndImageButton/SquareTextAndImageButton'

function Page({ pageId, isVisible }) {
  return (
    <PageTemplate pageId={pageId} isVisible={isVisible} header={PlayerHeader}>
      <div className={`${templateStyles.container}`}>
        <DefaultButton onClick={() => {}} buttonTextTranslationKey="join" buttonClass="default" />
        <DefaultButton onClick={() => {}} buttonTextTranslationKey="create" buttonClass="default" />
      </div>

      <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('featuredPools')}</div>
      <div className={`${templateStyles.contentHeader2}`}>{translator('featuredPoolsSubHeading')}</div>

      <div className={templateStyles.container}>
        <SquareTextAndImageButton onClick={() => {}} />
        <SquareTextAndImageButton onClick={() => {}} />
        <SquareTextAndImageButton onClick={() => {}} />
        <SquareTextAndImageButton onClick={() => {}} />
      </div>

      <div className={templateStyles.container}></div>

      <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('sports')}</div>
      <div className={templateStyles.contentHeader2}>{translator('sportsSubHeading')}</div>

      <div className={templateStyles.container}>
        <SquareTextAndImageButton mainTextTranslationKey={'soccer'} backgroundSvgIcon={`squareSoccer`} onClick={() => {}} />
        <SquareTextAndImageButton mainTextTranslationKey={'rugby'} backgroundSvgIcon={`squareRugby`} onClick={() => {}} />
        <SquareTextAndImageButton
          mainTextTranslationKey={'cricket'}
          backgroundSvgIcon={`squareCricket`}
          secondTextTranslationKey={'comingSoon'}
          disabled={true}
          onClick={() => {}}
        />
      </div>

      <div className={templateStyles.container}>
        <SquareTextAndImageButton mainTextTranslationKey={'tennis'} backgroundSvgIcon={`squareTennis`} secondTextTranslationKey={'comingSoon'} disabled={true} onClick={() => {}} />
        <SquareTextAndImageButton
          mainTextTranslationKey={'basketball'}
          backgroundSvgIcon={`squareBasketball`}
          secondTextTranslationKey={'comingSoon'}
          disabled={true}
          onClick={() => {}}
        />
        <SquareTextAndImageButton
          mainTextTranslationKey={'baseball'}
          backgroundSvgIcon={`squareBaseball`}
          secondTextTranslationKey={'comingSoon'}
          disabled={true}
          onClick={() => {}}
        />
      </div>

      <div className={templateStyles.container}>
        <SquareTextAndImageButton
          mainTextTranslationKey={'iceHockey'}
          backgroundSvgIcon={`squareIceHockey`}
          secondTextTranslationKey={'comingSoon'}
          disabled={true}
          onClick={() => {}}
        />
        <SquareTextAndImageButton mainTextTranslationKey={'afl'} backgroundSvgIcon={`squareAfl`} secondTextTranslationKey={'comingSoon'} disabled={true} onClick={() => {}} />
        <SquareTextAndImageButton
          mainTextTranslationKey={'americanFootball'}
          backgroundSvgIcon={`squareAmericanFootball`}
          secondTextTranslationKey={'comingSoon'}
          disabled={true}
          onClick={() => {}}
        />
      </div>
    </PageTemplate>
  )
}

Page.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  pageId: PropTypes.string.isRequired,
}

export default Page
