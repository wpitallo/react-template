// Import FirebaseAuth and firebase.
import { useEffect, useState } from 'react';
import { app } from '@configuration/firebaseConfig'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat/app";

import loginLogo from '@assets/login-logo.png';

// imports pre-built UI for firebase authentication
import * as firebaseui from "firebaseui";
// imports the firebaseui styles using the CDN
import "firebaseui/dist/firebaseui.css";


// Configure FirebaseUI.
const uiConfig = {
    signInFlow: 'popup', // Changed to 'redirect'
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false,
    },
    // required to enable one-tap sign-up credential helper
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
};

function SignInScreen() {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
            setIsSignedIn(!!user);
        });

        const ui =
            firebaseui.auth.AuthUI.getInstance() ||
            // since Firebase v9 and above service are imported when needed instead of being a namespace
            new firebaseui.auth.AuthUI(getAuth(app));
        ui.start("#firebaseui-auth-container", uiConfig)

        return () => {
            unsubscribe();
        };


    }, [setIsSignedIn]);



    if (!isSignedIn) {
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '0px', marginTop: '10vh' }}>
                    <img src={loginLogo} style={{ width: '225px' }} alt="Login Logo" />
                </div>
                <div style={{ position: 'relative', zIndex: 0 }}>
                    <div id="firebaseui-auth-container"></div>
                </div>
            </div>
        );
    }
    return (
        <div>
            <h1>My App</h1>
            <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        </div>
    );
}

export default SignInScreen;
