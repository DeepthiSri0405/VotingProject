// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYOZ-jL4_jV8f2ai45M8VjWUNOZp0pCPA",
  authDomain: "voting-project-53eb7.firebaseapp.com",
  projectId: "voting-project-53eb7",
  storageBucket: "voting-project-53eb7.firebasestorage.app",
  messagingSenderId: "855836676954",
  appId: "1:855836676954:web:ed8a56207c1e804190d963"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
