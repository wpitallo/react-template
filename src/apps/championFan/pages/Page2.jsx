import PropTypes from 'prop-types'
import PageTemplate from './PageTemplate'
import templateStyles from './PageTemplate.module.scss'
import { translator } from '@globalHelpers/translations'

function Page({ pageId, isVisible }) {
  return (
    <PageTemplate pageId={pageId} isVisible={isVisible}>
      <div className={`${templateStyles.contentHeader1} ${templateStyles.centeredText} ${templateStyles.headerMarginBottom} `}>{translator('findAPool')}</div>

      <div className={templateStyles.container}>
        <div className={templateStyles.square}>
          <div className={templateStyles['square-content']}></div>
        </div>
        <div className={templateStyles.square}>
          <div className={templateStyles['square-content']}></div>
        </div>
        <div className={templateStyles.square}>
          <div className={templateStyles['square-content']}></div>
        </div>
      </div>

      <div className={templateStyles.container}>
        <div className={templateStyles.square}>
          <div className={templateStyles['square-content']}></div>
        </div>
        <div className={templateStyles.square}>
          <div className={templateStyles['square-content']}></div>
        </div>
        <div className={templateStyles.square}>
          <div className={templateStyles['square-content']}></div>
        </div>
      </div>

      <div className={templateStyles.container}>
        <div className={templateStyles.square}>
          <div className={templateStyles['square-content']}></div>
        </div>
        <div className={templateStyles.square}>
          <div className={templateStyles['square-content']}></div>
        </div>
        <div className={templateStyles.square}>
          <div className={templateStyles['square-content']}></div>
        </div>
      </div>

      <div className={templateStyles.container}>
        <div className={templateStyles.square}>
          <div className={templateStyles['square-content']}></div>
        </div>
        <div className={templateStyles.square}>
          <div className={templateStyles['square-content']}></div>
        </div>
        <div className={templateStyles.square}>
          <div className={templateStyles['square-content']}></div>
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
