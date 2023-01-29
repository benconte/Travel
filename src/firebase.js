// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, deleteDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();

export const colRef = collection(db, "tovisit");
export const visitedRef = collection(db, "visited");

export const visit = async (coll, docId) => {
  const docRef = doc(db, coll, docId);

  await deleteDoc(docRef)
    .then(() => {
      console.log(`Document with Id[${docId}] was deleted successfully`);
    })
    .catch((err) => console.log(err));
};
