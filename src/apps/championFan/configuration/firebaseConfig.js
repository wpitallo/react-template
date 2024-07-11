import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Configure Firebase.
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1_mR2661a_4MNJuArxz8S1mZ4im3JH1Q",
    authDomain: "championfan-co-dev-be77b.firebaseapp.com",
    projectId: "championfan-co-dev-be77b",
    storageBucket: "championfan-co-dev-be77b.appspot.com",
    messagingSenderId: "731706025630",
    appId: "1:731706025630:web:83c47e4bdcd7dcb2f5bd8f",
    measurementId: "G-STQKYCJ6C6"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const auth = firebase.auth();
export { firebase }