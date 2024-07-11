// Import FirebaseAuth and firebase.
import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth.js';
import { firebase } from '@configuration/firebaseConfig'

import loginLogo from '@assets/login-logo.png';

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
};

function SignInScreen() {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    if (!isSignedIn) {
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '0px', marginTop: '-10vh' }}>
                    <img src={loginLogo} style={{ width: '225px' }} alt="Login Logo" />
                </div>
                <div style={{ position: 'relative', zIndex: 0 }}>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </div>
            </div>
        );
    }
    return (
        <div>
            <h1>My App</h1>
            <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
            <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
        </div>
    );
}

export default SignInScreen;
