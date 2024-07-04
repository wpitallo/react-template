import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Configure Firebase.
const config = {
    apiKey: "AIzaSyCB3C73UcvWaXn1h-mQi0qEcMlZ4XCeTdE",
    authDomain: "championfan-co-dev.firebaseapp.com",
    projectId: "championfan-co-dev",
    storageBucket: "championfan-co-dev.appspot.com",
    messagingSenderId: "225792653274",
    appId: "1:225792653274:web:c99abb8e5bce1d370532e3",
    measurementId: "G-XJCCH8YRZP"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
} else {
    firebase.app(); // if already initialized, use that one
}

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const auth = firebase.auth();
export { firebase }