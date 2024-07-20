import { useEffect, useState } from 'react'
import { app } from '@configuration/firebaseConfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth'
import * as firebaseui from 'firebaseui'
import loginLogo from '@assets/login-logo.png'

import 'firebaseui/dist/firebaseui.css'

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [GoogleAuthProvider.PROVIDER_ID, EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
}

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false) // Local signed-in state.

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user)
    })

    // Initialize FirebaseUI Auth
    const initializeFirebaseUI = () => {
      const uiInstance = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
      uiInstance.start('#firebaseui-auth-container', uiConfig)
    }

    if (!isSignedIn) {
      initializeFirebaseUI()
    }

    return () => {
      unsubscribe()
    }
  }, [isSignedIn, setIsSignedIn])

  if (!isSignedIn) {
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
  return (
    <div>
      <h1>My App</h1>
      <p>Welcome {getAuth(app).currentUser.displayName}! You are now signed-in!</p>
    </div>
  )
}

export default SignInScreen
