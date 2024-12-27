// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCODHcXAKLIwY8PQePTJfBPr0RV6OUa7D4",
  authDomain: "journey-planner-775a6.firebaseapp.com",
  projectId: "journey-planner-775a6",
  storageBucket: "journey-planner-775a6.firebasestorage.app",
  messagingSenderId: "488205787418",
  appId: "1:488205787418:web:d463661be4ab09b08dcca3",
  measurementId: "G-HYDTGRZ4QE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);