// Firebase init file

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzAMbLJUuolJofTTRdlt3hwFvbrn-53OY",
  authDomain: "a10-krishilink.firebaseapp.com",
  projectId: "a10-krishilink",
  storageBucket: "a10-krishilink.firebasestorage.app",
  messagingSenderId: "865330352192",
  appId: "1:865330352192:web:79c0b8936c2c4b0f9c8fa5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);  // ✅ MUST EXPORT THIS
