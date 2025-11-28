// firebase.init.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBzAMbLJUuolJofTTRdlt3hwFvbrn-53OY",
  authDomain: "a10-krishilink.firebaseapp.com",
  projectId: "a10-krishilink",
  storageBucket: "a10-krishilink.firebasestorage.app",
  messagingSenderId: "865330352192",
  appId: "1:865330352192:web:79c0b8936c2c4b0f9c8fa5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore (IMPORTANT)
export const db = getFirestore(app);

export default app;
