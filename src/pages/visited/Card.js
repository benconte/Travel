import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/MainContext";
import trash from "../../utils/trash.svg";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Card({ country, countries, setCountries }) {
  const { theme } = useContext(AppContext);

  // Function that adds a comma after thousandths for population
  const addCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const removeFromVisited = async () => {
    const ref = doc(db, "visited", country.docId)
    await deleteDoc(ref).then(() => {
      const cntry = []
      countries.forEach(elm => {
          if(elm.docId !== country.docId) {
            cntry.push(elm)
          }
        })
  
        // now deleting the document from the visited collection
        setCountries(cntry)
        console.log(`${country.name} was removed from visited`)
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
          onClick={() => removeFromVisited()}
          className={`border-none p-3 rounded-full bg-[#D9D9D9]`}
        >
          <img src={trash} alt="Check" className={`w-[16px] h-[16px]`} />
        </button>
      </div>
    </div>
  );
}
