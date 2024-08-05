import PropTypes from 'prop-types'
import PageTemplate from '../PageTemplate'
import templateStyles from '../PageTemplate.module.scss'
import { translator } from '@globalHelpers/translations'
import PlayerHeader from '@components/headers/playerHeader1/PlayerHeader'
import DefaultButton from '@components/buttons/defaultButton/DefaultButton'
import SquareTextAndImageButton from '@components/buttons/squareTextAndImageButton/SquareTextAndImageButton'

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
        <SquareTextAndImageButton onClick={() => {}} />
        <SquareTextAndImageButton onClick={() => {}} />
        <SquareTextAndImageButton onClick={() => {}} />
        <SquareTextAndImageButton onClick={() => {}} />
      </div>

      <div className={templateStyles.container}></div>

      <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('sports')}</div>
      <div className={templateStyles.contentHeader2}>{translator('sportsSubHeading')}</div>

      <div className={templateStyles.container}>
        <SquareTextAndImageButton mainText={'soccer'} backgroundSvgIcon={`squareSoccer`} onClick={() => {}} />
        <SquareTextAndImageButton mainText={'rugby'} backgroundSvgIcon={`squareRugby`} onClick={() => {}} />
        <SquareTextAndImageButton mainText={'cricket'} backgroundSvgIcon={`squareCricket`} secondText={'comingSoon'} disabled={true} onClick={() => {}} />
      </div>

      <div className={templateStyles.container}>
        <SquareTextAndImageButton mainText={'tennis'} backgroundSvgIcon={`squareTennis`} secondText={'comingSoon'} disabled={true} onClick={() => {}} />
        <SquareTextAndImageButton mainText={'basketball'} backgroundSvgIcon={`squareBasketball`} secondText={'comingSoon'} disabled={true} onClick={() => {}} />
        <SquareTextAndImageButton mainText={'baseball'} backgroundSvgIcon={`squareBaseball`} secondText={'comingSoon'} disabled={true} onClick={() => {}} />
      </div>

      <div className={templateStyles.container}>
        <SquareTextAndImageButton mainText={'iceHockey'} backgroundSvgIcon={`squareIceHockey`} secondText={'comingSoon'} disabled={true} onClick={() => {}} />
        <SquareTextAndImageButton mainText={'afl'} backgroundSvgIcon={`squareAfl`} secondText={'comingSoon'} disabled={true} onClick={() => {}} />
        <SquareTextAndImageButton mainText={'americanFootball'} backgroundSvgIcon={`squareAmericanFootball`} secondText={'comingSoon'} disabled={true} onClick={() => {}} />
      </div>
    </PageTemplate>
  )
}

Page.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  pageId: PropTypes.string.isRequired,
}

export default Page
