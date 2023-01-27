import React, { useState, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../../context/MainContext";
import { getDocs } from "firebase/firestore";
import { visitedRef } from "../../firebase";
import Card from "./Card";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/Auth";

function VisitedCountries() {
  const { theme } = useContext(AppContext);
  const { currentUser } = useContext(AuthContext);
  const [countries, setCountries] = useState([]);

  const getData = useCallback(async () => {
    let temp = [];
    await getDocs(visitedRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().uid === currentUser.uid) {
            temp.push({ ...doc.data(), docId: doc.data().id });
          }
        });
      })
      .catch((err) => console.log(err.message));
    setCountries(temp);
    console.log("new countries", countries);
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
          <div className="w-full mt-10 mb-5">
            <h3
              className={`font-medium ${theme.secondaryText} text-base`}
            >
              All countries you've visited
            </h3>
          </div>
          <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
            {countries.map((country, key) => (
              <Card country={country} key={key} setCountries={setCountries} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VisitedCountries;
