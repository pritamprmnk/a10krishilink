// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);