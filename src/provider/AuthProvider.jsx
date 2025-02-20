import {  GoogleAuthProvider, onAuthStateChanged,  signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import  { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';
export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loader, setLoader] = useState(true)
    const provider = new GoogleAuthProvider();
    // google user//
    // medicin

    const googleRegister = () => {
        setLoader(true)
        return signInWithPopup(auth, provider)
    }
  
    const userLogout = () => {
        return signOut(auth)

    }
    const myProfileUpdate = (updatedData) => {
        setLoader(true)
        return updateProfile(auth.currentUser,updatedData)
    }

    useEffect(() => {
        const unsubscibe = onAuthStateChanged(auth, (currentUser) => {
            setuser(currentUser)
            setLoader(false)

        })
        return () => {
          return  unsubscibe()
        }
    }, [])

    useEffect(() =>{
        if(user){
            setLoader(false)
        }
        
   },[user])

    const authObjct = {
        googleRegister,
        userLogout,
        myProfileUpdate,
        user,
        setuser,
        loader,
        setLoader
    }

    return (
        <div>
            <AuthContext.Provider value={authObjct}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;