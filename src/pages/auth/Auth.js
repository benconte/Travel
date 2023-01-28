import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getAuth, updateProfile } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  /* we sign in is called, we call signInWithEmailAndPassword which takes in email and password
     it also takes in the auth from the firebase file.
     this func authenticates the user */
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   takes in an email, passwrod and username and saves them to firestore using createUserWithEmailAndPassword
  const register = async (email, password, username) => {
    return await createUserWithEmailAndPassword(auth, email, password).then(
      (result) => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: username,
        });
      }
    );
  };

  useEffect(() => {
    // we check if the user is authenticated, if so we add that user to the setCurrentUser state
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser, signIn, register }}>
      {children}
    </AuthContext.Provider>
  );
};
