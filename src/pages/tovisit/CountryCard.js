import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import check from "../../utils/check.svg";
import trash from "../../utils/trash.svg";
import { AppContext } from "../../context/MainContext";
import { addDoc } from "firebase/firestore";
import { visitedRef } from "../../firebase";

export default function CountryCard({ country }) {
  const { theme } = useContext(AppContext);
  const [isVisited, setIsVisited] = useState(false);

  // Function that adds a comma after thousandths for population
  const addCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const visitCountry = async () => {
    await addDoc(visitedRef, {
      name: country.name.common,
      population: country.population,
      region: country.region,
      capital: country.capital,
      currencies: country.currencies,
      domain: country.tld,
      languages: country.languages,
      borderCountries: country.borders,
      flag: country.flags.svg,
    }).then(() => {
      setIsVisited(true);
    });
  };

  const removeVisitTo = async () => {};
  return (
    <div
      className={`w-full flex flex-col justify-start rounded-xl overflow-hidden bg-[${theme.cardBackground}] z-0`}
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
      <div className="z-10 w-full flex justify-end gap-2 p-3">
        <button
          type="button"
          onClick={() => removeVisitTo()}
          className={`border-none p-3 rounded-full ${
            isVisited ? "bg-[var(--green)]" : "bg-[#D9D9D9]"
          }`}
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
