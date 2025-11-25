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

  // ✅ Create user with email, password, name & photo
  const createUser = (email, password, name, photoURL) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        return updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL
        }).then(() => result.user);
      });
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Current user:", currentUser);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
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
