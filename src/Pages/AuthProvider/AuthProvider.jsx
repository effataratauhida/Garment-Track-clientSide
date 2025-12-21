import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signOutUser = () =>{
        return signOut(auth);
    }

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      setUser(currentUser);

      try {
        const res = await fetch(
          `http://localhost:5000/users/${currentUser.email}`,
          { credentials: "include" }
        );
        const data = await res.json();

        // SAFE fallback
        setRole(data?.role || "buyer");
      } catch (error) {
        console.error("Role fetch error:", error);
        setRole("buyer");
      } finally {
        setLoading(false); 
      }
    } else {
      setUser(null);
      setRole(null);
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []);


    const authData = {
        user,
        setUser,
        role,
        createUser,
        loading,
        signOutUser
    }
    return <AuthContext.Provider value={authData}>
         {children}
    </AuthContext.Provider>
};

export default AuthProvider;