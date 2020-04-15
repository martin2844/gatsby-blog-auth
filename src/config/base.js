import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const app = firebase.initializeApp({
    apiKey: process.env.GATSBY_FIREBASE_KEY,
    authDomain: process.env.GATSBY_FIREBASE_DOMAIN,
    databaseURL: process.env.GATSBY_FIREBASE_DATABASE,
    projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
    storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.GATSBY_FIREBASE_SENDER_ID

})


export default app;