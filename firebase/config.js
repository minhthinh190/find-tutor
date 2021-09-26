import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const app = initializeApp({
  apiKey: "AIzaSyCTt4jt6Yf6L2FoMwft_KfJwfXO7r-UOB8",
  authDomain: "find-tutor-2b4db.firebaseapp.com",
  projectId: "find-tutor-2b4db",
  storageBucket: "find-tutor-2b4db.appspot.com",
  messagingSenderId: "643217828885",
  appId: "1:643217828885:web:224ffc36521a64953cb21c",
  measurementId: "G-232GZ3WQVF"
  /*
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
  */
})

export const auth = getAuth(app)
export default app
