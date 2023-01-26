import React, { useState, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../../context/MainContext";
import { getDocs } from "firebase/firestore";
import { colRef } from "../../firebase";
import CountryCard from "./CountryCard";

function Countries() {
  const { theme } = useContext(AppContext);
  const [places, setPlaces] = useState([]);
//   (prev) => {
//     const copy = [...prev];
//     copy.push({
//       ...doc.data(),
//       docId: doc.id,
//     });
//     return copy;
//   }
  const getData = useCallback(async () => {
    let temp = [];
    await getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            temp.push({...doc.data(), docId: doc.data().id})
        });
      })
      .catch((err) => console.log(err.message));
      setPlaces(temp);
      console.log(places)
  }, [places]);

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="w-full h-full pb-5 px-8">
      {places && (
        <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-5">
          {places.map((country, key) => (
            <CountryCard country={country} key={key} countries={places} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Countries;
