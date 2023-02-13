import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAuXk9_lQOZ7y9lBkJtqsMTkpiK9XiqLNM",
  authDomain: "fireit-a5b39.firebaseapp.com",
  projectId: "fireit-a5b39",
  storageBucket: "fireit-a5b39.appspot.com",
  messagingSenderId: "789223904157",
  appId: "1:789223904157:web:322ed09c67a31823efd574"
};

const app = initializeApp(firebaseConfig);

initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});

export const auth = getAuth(app)
export const db = getFirestore(app)


export default app;