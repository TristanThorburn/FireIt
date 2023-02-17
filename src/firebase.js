import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
// import { disableNetwork, enableNetwork } from "firebase/firestore"; 

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

enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a time.
      console.log('Firestore persistence failed');
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      console.log('Firestore persistence is not available');
    }
  });

export default app;

// await disableNetwork(db);
// console.log("Network disabled!");
// Do offline actions
// ... 

// await enableNetwork(db);