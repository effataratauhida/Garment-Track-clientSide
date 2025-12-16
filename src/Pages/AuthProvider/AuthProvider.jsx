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
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signOutUser = () =>{
        return signOut(auth);
    }

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
        if (currentUser) {

            setUser(currentUser);

            const fetchRole = async () => {
                try{
                    const res = await fetch(`http://localhost:5000/users/${currentUser.email}`);
                    const data = await res.json();
                        
                    setRole(data.role);
                }
                    catch (err) {
          console.log(err);
        } 
        finally {
            setLoading(false);
          }
            };

            fetchRole();
        }
         else {
        setUser(null);
        setRole(null);
      }
        
        
    });
    return () => {
       unsubscribe();
    }
   },[])

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