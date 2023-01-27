import React, { useContext } from "react";
import { AppContext } from "../../context/MainContext";

function State({ country }) {
  const { theme } = useContext(AppContext);
  return (
    <div className="w-full md:block lg:flex items-start h-full gap-2 py-10">
      <div className="md:w-full lg:w-3/6 sm:h-[200px] lg:h-[400px] mx-4">
      <img
          src={country.flags.svg}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="md:w-full lg:basis-5/12 my-6 mx-2">
        <h1 className={`text-2xl font-medium mb-4 ${theme.primaryText} `}>
          {country.name.common}
        </h1>
        <div className="md:block lg:flex items-start justify-between">
          <div className="flex flex-col justify-start gap-3">
            <p className={`text-[18px] font-medium ${theme.secondaryText}`}>
              Native Name:{" "}
              <span className="text-gray-500 font-normal">
                {Object.keys(country.name.nativeName)}
              </span>
            </p>
            <p className={`text-[18px] font-medium ${theme.darkText}`}>
              Population:{" "}
              <span className="text-gray-500 font-normal">
                {country.population}
              </span>
            </p>
            <p className={`text-[18px] font-medium ${theme.darkText}`}>
              Region:{" "}
              <span className="text-gray-500 font-normal">
                {country.region}
              </span>
            </p>
            <p className={`text-[18px] font-medium ${theme.darkText}`}>
              Sub Region:{" "}
              <span className="text-gray-500 font-normal">
                {country.subregion}
              </span>
            </p>
            <p className={`text-[18px] font-medium ${theme.darkText}`}>
              Capital:{" "}
              <span className="text-gray-500 font-normal">
                {country.capital}
              </span>
            </p>
          </div>
          <br />
          <div className="flex flex-col justify-start gap-3 md:pt-3 lg:pt-0">
            <p className={`text-[18px] font-medium ${theme.darkText}`}>
              Top Level Domain:{" "}
              <span className="text-gray-500 font-normal">{country.tld}</span>
            </p>
            <p className={`text-[18px] font-medium ${theme.darkText}`}>
              Currencies:{" "}
              <span className="text-gray-500 font-normal">
                {country.population}
              </span>
            </p>
            <p className={`text-[18px] font-medium ${theme.darkText}`}>
              Languages:{" "}
              <span className="text-gray-500 font-normal">
                {Object.keys(country.languages)}
              </span>
            </p>
          </div>
        </div>
        {/* border countries */}
        <div className={`w-full text-[18px] flex items-start flex-wrap gap-2 font-medium ${theme.secondaryText} mt-8`}>
          <p>Border Countries:</p>
          {/* <p className="flex items-start flex-wrap gap-2 pl-1"> */}
            {country.borders.map((brd, key) => (
              <span className={`rounded text-sm font-normal py-1 px-2 cursor-pointer ${theme.lightBackground} text-gray-500`}>{brd}</span>
            ))}
          {/* </p> */}
        </div>
      </div>
    </div>
  );
}

export default State;
