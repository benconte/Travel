// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, collection, doc, deleteDoc
 } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAntQpXIcNSEjpD-jj2c-8kbVQH3Dnraxc",
  authDomain: "travel-5a958.firebaseapp.com",
  projectId: "travel-5a958",
  storageBucket: "travel-5a958.appspot.com",
  messagingSenderId: "897208159790",
  appId: "1:897208159790:web:88578f5096f6a63fced9bf",
  measurementId: "G-4CEBCL544S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore()

export const colRef = collection(db, "tovisit")
export const visitedRef = collection(db, "visited")

export const visit = async (coll, docId) => {
  const docRef = doc(db, coll, docId)

  await deleteDoc(docRef).then(() => {
    console.log(`Document with Id[${docId}] was deleted successfully`)
  }).catch(err => console.log(err))
}

// apiKey: process.env.APIKEY,
// authDomain: process.env.AUTHDOMAIN,
// projectId: process.env.PROJECTID,
// storageBucket: process.env.STORAGEBUCKET,
// messagingSenderId: process.env.MESSAGINGSENDERID,
// appId: process.env.APPID,
// measurementId: process.env.MEASUREMENTID