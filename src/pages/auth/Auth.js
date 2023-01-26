import React, { createContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        })
    }, [])
    return (
        <AuthContext.Provider value={{currentUser, signIn, register}}>
            {children}
        </AuthContext.Provider>
    )
}