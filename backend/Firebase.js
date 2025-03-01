import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// const firebaseConfig = process.env.NEXT_PUBLIC === 'production' ? {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
//   measurementId: ""
// } : {


//I refered to stackoverflow to get the correct way to use environment variables in react. But this didn't work getting invalid api key error in console.
//https://stackoverflow.com/questions/72347849/using-the-environment-variable-firebase-invalid-api-key-error-in-console
const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`,
  measurementId: `${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`
}

// const firebaseConfig = {
//     apiKey: "AIzaSyCRnfHmxI754fG3JcGEDq0BFzVt--JaZu4",
//     authDomain: "finwise-7a208.firebaseapp.com",
//     projectId: "finwise-7a208",
//     storageBucket: "finwise-7a208.firebasestorage.app",
//     messagingSenderId: "775589434573",
//     appId: "1:775589434573:web:da2e087e927f8b5ca9c584",
//     measurementId: "G-EJH92EJ7NW"
//   };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const analytics = () => getAnalytics(app);

export default app