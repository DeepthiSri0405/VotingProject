// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// Use environment variables for security
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

// Firestore (Database)
const db = getFirestore(app);

// Authentication
const auth = getAuth(app);

// Storage (For Uploading Files, Images, etc.)
const storage = getStorage(app);

export { db, auth, storage };
