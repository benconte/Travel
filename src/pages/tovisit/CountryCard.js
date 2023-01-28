import React, { useContext } from "react";
import { Link } from "react-router-dom";
import trash from "../../utils/images/trash.svg";
import { AppContext } from "../../context/MainContext";
import { addDoc, deleteDoc, doc } from "firebase/firestore";
import { visitedRef, visit, db } from "../../firebase";

export default function CountryCard({ country, setPlaces, places }) {
  const { theme } = useContext(AppContext);

  // Function that adds a comma after thousandths for population
  const addCommas = (number) => {
    return number.toLocaleString("en-US");
  };

  // we add the country to visited collection in firebase and at the same time we remove it,
  // from the toVisit collection as well as the places state
  const visitCountry = async () => {
    const temp = { ...country }
    
    await addDoc(visitedRef, temp).then(() => {
      const cntry = []
      places.forEach(elm => {
        if(elm.docId !== country.docId) {
          cntry.push(elm)
        }
      })

      // now deleting the document from the toVisit collection
      const msg = visit("tovisit", country.docId)
      setPlaces(cntry)
      console.log(msg)
    });
  };

  // we remove a country from toVisit by calling the deleteDoc and we pass in a doc 
  // containing the collection and the docId
  const removeVisitTo = async () => {
    const ref = doc(db, "tovisit", country.docId)
    await deleteDoc(ref).then(() => {
      const cntry = []
        places.forEach(elm => {
          if(elm.docId !== country.docId) {
            cntry.push(elm)
          }
        })
  
        // now deleting the document from the toVisit collection
        setPlaces(cntry)
        console.log(`${country.name} was removed from toVisit`)
    }).catch(err => console.log(err))
  };
  return (
    <div
      className={`w-full flex flex-col justify-start rounded-xl overflow-hidden bg-[${theme.cardBackground}]`}
    >
      <Link to={`/country/${country.name}`} className="w-full">
        <div className="w-full h-48 rounded-2">
          <img
            src={country.flag}
            alt={country.name}
            className="w-full h-full object-cover rounded-b-xl"
          />
        </div>
        {/* card content */}
        <div className="w-full h-auto flex flex-col justify-start gap-3 p-3">
          <h3 className={`text-2xl font-medium ${theme.primaryText} truncate`}>
            {country.name}
          </h3>
          <span className={`${theme.secondaryText}`}>
            Population: {addCommas(country.population)}
          </span>
          <span className={`${theme.secondaryText} truncate`}>
            Capital: {country.capital}
          </span>
          <span className={`${theme.secondaryText}`}>Currency: random</span>
        </div>
      </Link>
      {/* buttons */}
      <div className="w-full flex justify-end gap-2 p-3">
        <button
          type="button"
          onClick={() => removeVisitTo()}
          className={`border-none p-3 rounded-full bg-[#D9D9D9]`}
        >
          <img src={trash} alt="Check" className={`w-[16px] h-[16px]`} />
        </button>
        <button
          type="button"
          onClick={() => visitCountry()}
          className={`border-none py-1 px-4 text-sm font-medium cursor-pointer rounded text-white bg-[var(--green)] hover:bg-[var(--dark-green)]`}
        >
          Visit
        </button>
      </div>
    </div>
  );
}
