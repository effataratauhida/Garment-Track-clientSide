import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signOutUser = () =>{
        return signOut(auth);
    }

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser);
        setLoading(false);
    });
    return () => {
       unsubscribe();
    }
   },[])

    const authData = {
        user,
        setUser,
        createUser,
        loading,
        signOutUser
    }
    return <AuthContext.Provider value={authData}>
         {children}
    </AuthContext.Provider>
};

export default AuthProvider;