import React, { createContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, updateProfile } from "firebase/auth";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const register = async (email, password, username) => {
        return await createUserWithEmailAndPassword(auth, email, password).then((result) => {
            const auth = getAuth()
            updateProfile(auth.currentUser, {
                displayName: username,
            })
        })
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