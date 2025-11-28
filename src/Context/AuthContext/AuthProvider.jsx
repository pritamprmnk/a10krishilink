import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../../Firebase/firebase.init';

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);   // 🔥 loading added

  const createUser = (email, password, name, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        return updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL
        }).then(() => result.user);
      });
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);                    // 🔥 loading finished
      console.log("Current user:", currentUser);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,        // 🔥 send loading state
    createUser,
    signInUser,
    logout
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
