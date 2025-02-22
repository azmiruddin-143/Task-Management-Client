import {  
    GoogleAuthProvider, 
    onAuthStateChanged,  
    signInWithPopup, 
    signOut, 
    updateProfile 
  } from 'firebase/auth';
  import { createContext, useEffect, useState } from 'react';
  import { auth } from '../firebase/firebase.init';
  
  export const AuthContext = createContext();
  
  const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true); // loader -> loading করা হলো
      const provider = new GoogleAuthProvider();
  
      // Google Sign In
      const googleRegister = () => {
          setLoading(true);
          return signInWithPopup(auth, provider);
      };
  
      // User Logout
      const userLogout = () => {
          setLoading(true);
          return signOut(auth);
      };
  
      // Update Profile
      const myProfileUpdate = (updatedData) => {
          setLoading(true);
          return updateProfile(auth.currentUser, updatedData);
      };
  
      // Check Auth State
      useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
              setUser(currentUser);
              setLoading(false);
          });
  
          return () => unsubscribe();
      }, []);
  
      const authObject = {
          googleRegister,
          userLogout,
          myProfileUpdate,
          user,
          setUser,
          loading, // loader -> loading করা হলো
          setLoading
      };
  
      return (
          <AuthContext.Provider value={authObject}>
              {children}
          </AuthContext.Provider>
      );
  };
  
  export default AuthProvider;
  