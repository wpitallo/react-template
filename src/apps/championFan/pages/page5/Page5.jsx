import { getAuth } from 'firebase/auth'
import { app } from '@configuration/firebaseConfig'
import PropTypes from 'prop-types'
import PageTemplate from '../PageTemplate'
import templateStyles from '../PageTemplate.module.scss'
import Avatar from '@components/avatar/Avatar'

function Page({ pageId, isVisible, setVisiblePage }) {
  return (
    <PageTemplate pageId={pageId} isVisible={isVisible}>
      <div className={templateStyles.container}>
        <div className={`${templateStyles.verticalContainer} ${templateStyles.avatarMarginTop}`}>
          <div className={templateStyles.avatarRow}>
            <div className={templateStyles.verticalContainerColumn}>
              <Avatar />
            </div>
          </div>
          <div className={templateStyles.verticalContainerRow}>
            <div className={`${templateStyles.halfWidth}`}>
              <button onClick={() => setVisiblePage(0)}>Profile</button>
            </div>
          </div>
          <div className={templateStyles.verticalContainerRow}>
            <div className={`${templateStyles.halfWidth}`}>
              <button onClick={() => getAuth(app).signOut()} style={{}}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}

Page.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  pageId: PropTypes.string.isRequired,
  setVisiblePage: PropTypes.func.isRequired,
}

export default Page
