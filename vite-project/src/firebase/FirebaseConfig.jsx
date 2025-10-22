// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLjBzYbUwb1xJ7NxDHX7s3c57H1leaJI8",
  authDomain: "kaurkraftshop-d8a7e.firebaseapp.com",
  projectId: "kaurkraftshop-d8a7e",
  storageBucket: "kaurkraftshop-d8a7e.firebasestorage.app",
  messagingSenderId: "535459143395",
  appId: "1:535459143395:web:6ea8d41cc4f5c189deafd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;