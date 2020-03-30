import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.FIREBASE_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASe_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID

})

console.log(process.env.FIREBASE_DOMAIN, "help2");
console.log(process.env.NETLIFY);
console.log(process.env.production.FIREBASE_KEY);

export default app;