import React, { useState, useEffect, useContext, useCallback } from "react";
import { getDocs } from "firebase/firestore";
import { colRef } from "../../firebase";
import CountryCard from "./CountryCard";
import { AuthContext } from "../auth/Auth";
import { AppContext } from "../../context/MainContext";
import { Link } from "react-router-dom";

function Countries() {
  const { currentUser } = useContext(AuthContext);
  const { theme } = useContext(AppContext);
  const [places, setPlaces] = useState([]);

  // we get the toVisit countries from firebase firestore and save them in places state
  const getData = useCallback(async () => {
    let temp = [];
    await getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().uid === currentUser.uid) {
            temp.push({ ...doc.data(), docId: doc.id });
          }
        });
      })
      .catch((err) => console.log(err.message));
    setPlaces(temp);
  }, [currentUser.uid]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-full pb-5 px-8">
      {/* we check if we got any data from firebase, if we didn't we show no countries */}
      {places.length === 0 ? (
        <div className="w-full text-center my-20">
          <h3
            className={`font-medium ${theme.secondaryText} text-center text-3xl my-3`}
          >
            You don't have any countries you wan't to visit
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
          <div className="w-full mt-10 mb-5">
            <h3 className={`font-medium ${theme.secondaryText} text-base`}>
              All the countries you want to visit
            </h3>
          </div>

          <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-5">
      {/* from here we map through the places array  */}
            {places.map((country, key) => (
              <CountryCard
                country={country}
                key={key}
                setPlaces={setPlaces}
                places={places}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Countries;
