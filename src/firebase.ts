// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChCpepxvRTq3vqhFpbgYWbAFhSzW20wCM",
  authDomain: "twitter-reloaded-96616.firebaseapp.com",
  projectId: "twitter-reloaded-96616",
  storageBucket: "twitter-reloaded-96616.appspot.com",
  messagingSenderId: "646245055726",
  appId: "1:646245055726:web:454ebb5f82998f92c147ff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
