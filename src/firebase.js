// OLD WAY DOESNT WORK import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGZsrIc8wqovHOXDIBj3dGZUzpbxOwuvU",
  authDomain: "instagram-clone-f39aa.firebaseapp.com",
  projectId: "instagram-clone-f39aa",
  storageBucket: "instagram-clone-f39aa.appspot.com",
  messagingSenderId: "806489232887",
  appId: "1:806489232887:web:1abb8e0d9041e9abd8caf2",
  measurementId: "G-P5X4SLDVYY",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
