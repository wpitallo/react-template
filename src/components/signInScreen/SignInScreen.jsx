import { useEffect, useContext } from 'react'
import { app } from '@configuration/firebaseConfig'
import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth'
import * as firebaseui from 'firebaseui'
import loginLogo from '@assets/login-logo.png'
import { DataContext } from '@providers/DataProvider'

import 'firebaseui/dist/firebaseui.css'

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [GoogleAuthProvider.PROVIDER_ID, EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
}

function SignInScreen() {
  const { user } = useContext(DataContext)

  useEffect(() => {
    const auth = getAuth(app)
    const initializeFirebaseUI = () => {
      const uiInstance = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
      uiInstance.start('#firebaseui-auth-container', uiConfig)
    }

    initializeFirebaseUI()
  }, [])

  if (!user) {
    return (
      <div style={{ height: '100%', position: 'relative' }}>
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            marginBottom: '0px',
            marginTop: '10vh',
          }}
        >
          <img src={loginLogo} style={{ width: '225px' }} alt="Login Logo" />
        </div>
        <div style={{ position: 'relative', zIndex: 0 }}>
          <div id="firebaseui-auth-container"></div>
        </div>
      </div>
    )
  }
  return <div></div>
}

export default SignInScreen
