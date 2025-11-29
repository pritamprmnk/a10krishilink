import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* --------------------------------------------------
      Create User (Signup)
  -------------------------------------------------- */
  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // update profile
    if (name || photoURL) {
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL,
      });
    }

    return result.user;
  };

  /* --------------------------------------------------
      Login User
  -------------------------------------------------- */
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };


  const signInWithGoogle = () =>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  }

  /* --------------------------------------------------
      Logout User
  -------------------------------------------------- */
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  /* --------------------------------------------------
      Track Auth State
  -------------------------------------------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      console.log("🔄 Current logged user:", currentUser);
    });

    return () => unsubscribe();
  }, []);

  /* --------------------------------------------------
      Context Value
  -------------------------------------------------- */
  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    logout,
    setUser, // sometimes helpful
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
