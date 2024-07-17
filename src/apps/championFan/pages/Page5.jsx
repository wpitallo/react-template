import { getAuth } from 'firebase/auth'
import { app } from '@configuration/firebaseConfig'
import PropTypes from 'prop-types'
import PageTemplate from './PageTemplate'
import templateStyles from './PageTemplate.module.scss'

function Page({ pageId, isVisible }) {
  return (
    <PageTemplate pageId={pageId} isVisible={isVisible}>
      <h1 className={templateStyles.header1}>Page 5</h1>
      <div className={templateStyles.container}>
        <button onClick={() => getAuth(app).signOut()} style={{}}>
          Sign out
        </button>
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
