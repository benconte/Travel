import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import check from "../../utils/images/check.svg";
import { AppContext } from "../../context/MainContext";
import { addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { colRef, db } from "../../firebase";
import { AuthContext } from "../auth/Auth";

export default function ImgMediaCard({ country, countries, setCountries }) {
  const { theme } = useContext(AppContext);
  const { currentUser } = useContext(AuthContext);
  const [isVisited, setIsVisited] = useState(false);

  // Function that adds a comma after thousandths for population
  const addCommas = (number) => {
    return number.toLocaleString("en-US");
  };

  const removeVisitTo = async (docId) => {
    // first we get the tovisit collection in firebase and pass it the docId we want to delete
    // after deleting we update the state to remove the deleted country
    const ref = doc(db, "tovisit", docId);
    await deleteDoc(ref)
      .then(() => {
        const cntry = [];
        countries.forEach((elm) => {
          if (elm.docId !== docId) {
            cntry.push(elm);
          }
        });

        // now deleting the document from the toVisit collection
        setCountries(cntry);
      })
      .catch((err) => console.log(err));
  };

  const visitCountry = async () => {
    // to avoid duplication, first we check if the country is already in istovisit
    if (isVisited === false) {
      await addDoc(colRef, {
        name: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital,
        currencies: country.currencies,
        domain: country.tld,
        languages: country.languages,
        borderCountries: country.borders,
        flag: country.flags.svg,
        uid: currentUser.uid,
      }).then(() => {
        setIsVisited(true);
      });
    } else {
      // if the user click the check button and the
      // country already exists in toVisit
      // the remove it from toVisit
      await getDocs(colRef)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().uid === currentUser.uid) {
              if (doc.data().name === country.name.common) {
                removeVisitTo(doc.id);
                setIsVisited(false);
              }
            }
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
      console.log("called");
    }
  };

  useEffect(() => {
    // checking if the current country is in to visit. If it is add a checkmark
    getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().uid === currentUser.uid) {
            if (doc.data().name === country.name.common) {
              setIsVisited(true);
            }
          } else {
            setIsVisited(false);
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [country, countries, currentUser.uid]);

  return (
    <div
      className={`w-full flex flex-col justify-start rounded-xl overflow-hidden bg-[${theme.cardBackground}]`}
      data-cell="country"
    >
      <Link to={`/country/${country.name.common}`} className="w-full">
        <div className="w-full h-48 rounded-2">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="w-full h-full object-cover rounded-b-xl"
          />
        </div>
        {/* card content */}
        <div className="w-full h-auto flex flex-col justify-start gap-3 p-3">
          <h3 className={`text-2xl font-medium ${theme.primaryText} truncate`}>
            {country.name.common}
          </h3>
          <span className={`${theme.secondaryText}`}>
            Population: {addCommas(country.population)}
          </span>
          <span className={`${theme.secondaryText} truncate`}>
            Capital: {country.capital}
          </span>
          <span className={`${theme.secondaryText}`}>Currency:random</span>
        </div>
      </Link>
      {/* buttons */}
      <div className="w-full flex justify-end gap-2 p-3">
        {/* the button adds this country to the tovisit collection in firebase */}
        <button
          type="button"
          onClick={() => visitCountry()}
          className={`border-none p-3 rounded-full ${
            isVisited ? "bg-[var(--green)]" : "bg-[#D9D9D9]"
          }`}
        >
          <img src={check} alt="Check" className={`w-[16px] h-[16px]`} />
        </button>
      </div>
    </div>
  );
}
