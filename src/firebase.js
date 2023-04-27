import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCLClgqK3DbKK3-zJOuD81YF8kVBkj2Yuk",
  authDomain: "rifle-war.firebaseapp.com",
  projectId: "rifle-war",
  storageBucket: "rifle-war.appspot.com",
  messagingSenderId: "356714164637",
  appId: "1:356714164637:web:5301bebc81ac5c5017ff74",
  measurementId: "G-76MRKFHJ2M"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
