// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgnhmG-_BqbmQ3z0KFIo_sbLLfnLF-NUk",
  authDomain: "chat-app-telegram.firebaseapp.com",
  projectId: "chat-app-telegram",
  storageBucket: "chat-app-telegram.appspot.com",
  messagingSenderId: "673500268667",
  appId: "1:673500268667:web:9518fe0adc1a277d77fade",
  measurementId: "G-H7V8L5REP7"
};

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_APIKEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECTID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
//   appId: process.env.NEXT_PUBLIC_APPID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {db, auth , provider}