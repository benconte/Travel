import React, { useState, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../../context/MainContext";
import { visitedRef } from "../../firebase";
import Card from "./Card";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import { getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

function VisitedCountries() {
  const { theme } = useContext(AppContext);
  const { currentUser } = useContext(AuthContext);
  const [countries, setCountries] = useState([]);

  const deleteAll = useCallback(async () => { // this function deletes all the visited countries
    await getDocs(visitedRef)
      .then((snapshot) => {
        snapshot.docs.forEach((docum) => {
          if(docum.data().uid === currentUser.uid) {
            // delete all teh visited countries belonging to the user
            deleteDoc(doc(db, "visited", docum.id));
          }
        });
      })
      .catch((err) => console.log(err.message));
    setCountries([]);
  }, [])

  const getData = useCallback(async () => {
    let temp = [];
    await getDocs(visitedRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().uid === currentUser.uid) {
            temp.push({ ...doc.data(), docId: doc.id });
          }
        });
      })
      .catch((err) => console.log(err.message));
    setCountries(temp);
  }, [countries, currentUser.uid]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-full pb-5 px-8">
      {countries.length === 0 ? (
        <div className="w-full text-center my-20">
          <h3
            className={`font-medium ${theme.secondaryText} text-center text-3xl my-3`}
          >
            You don't have any visited countries
          </h3>
          <Link
            to={"/"}
            className={`text-base font-medium text-[#0095f6] ${theme.secondaryText}`}
          >
            Views countries
          </Link>
        </div>
      ) : (
        <div className="w-full">
          <div className="w-full mt-10 mb-5 flex items-center gap-2">
            <h3 className={`font-medium ${theme.secondaryText} text-base`}>
              All the countries you've visited
            </h3>
            <button
              type="button"
              onClick={() => deleteAll()}
              className={`border-none py-2 px-4 text-sm font-medium cursor-pointer rounded bg-[#D9D9D9] hover:bg-red-600 hover:text-white`}
            >
              Clear all
            </button>
          </div>
          <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
            {countries.map((country, key) => (
              <Card
                country={country}
                key={key}
                setCountries={setCountries}
                countries={countries}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VisitedCountries;
