import React, { useContext } from "react";
import { AppContext } from "../../context/MainContext";

function State({ country }) {
  const { theme } = useContext(AppContext);
  console.log(country);
  // format the number
  const addCommas = (number) => {
    return number.toLocaleString("en-US");
  };
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
        <div className="md:block lg:flex items-start justify-between gap-3">
          <div className="flex flex-col justify-start gap-3">
            <p
              className={`text-[18px] flex items-center gap-1 flex-wrap font-medium ${theme.secondaryText}`}
            >
              Native Name:
              <span className="text-gray-500 font-normal">
                {country.name.nativeName ? (
                  Object.keys(country.name.nativeName)
                ) : (
                  <h3 className={`text-gray-500 font-normal text-base`}>
                    None
                  </h3>
                )}
              </span>
            </p>
            <p
              className={`text-[18px] flex items-center gap-1 flex-wrap font-medium ${theme.darkText}`}
            >
              Population:
              <span className="text-gray-500 font-normal">
                {addCommas(country.population ? country.population : 0)}
              </span>
            </p>
            <p
              className={`text-[18px] flex items-center gap-1 flex-wrap font-medium ${theme.darkText}`}
            >
              Region:
              <span className="text-gray-500 font-normal">
                {country.region ? country.region : "None"}
              </span>
            </p>
            <p
              className={`text-[18px] flex items-center gap-1 flex-wrap font-medium ${theme.darkText}`}
            >
              Sub Region:
              <span className="text-gray-500 font-normal">
                {country.subregion ? country.subregion : "None"}
              </span>
            </p>
            <p
              className={`text-[18px] flex items-center gap-1 flex-wrap font-medium ${theme.darkText}`}
            >
              Capital:
              <span className="text-gray-500 font-normal">
                {country.capital ? country.capital : "None"}
              </span>
            </p>
          </div>
          <br />
          <div className="flex flex-col justify-start gap-3 md:pt-3 lg:pt-0">
            <p
              className={`text-[18px] flex items-center gap-1 flex-wrap font-medium ${theme.darkText}`}
            >
              Top Level Domain:
              <span className="text-gray-500 font-normal">
                {country.tld ? country.tld : "None"}
              </span>
            </p>
            <p
              className={`text-[18px] flex items-center gap-1 flex-wrap font-medium ${theme.darkText}`}
            >
              Currencies:
              <span className="text-gray-500 font-normal">
                {country.currencies ? (
                  Object.keys(country.currencies).join(", ")
                ) : (
                  <h3 className="text-gray-500 font-normal">None</h3>
                )}
              </span>
            </p>
            <p
              className={`text-[18px] flex items-start gap-1 flex-wrap font-medium ${theme.darkText}`}
            >
              Languages:
              <span className="text-gray-500 font-normal truncate">
                {country.languages ? Object.keys(country.languages).join(", ") : (
                  <h3 className="text-gray-500 font-normal">None</h3>
                )}
              </span>
            </p>
          </div>
        </div>
        {/* border countries */}
        <div
          className={`w-full text-[18px] flex items-start flex-wrap gap-2 font-medium ${theme.secondaryText} mt-8`}
        >
          <p>Border Countries:</p>
          {/* we map through the border countries */}
          {country.borders ? (
            country.borders.map((brd, key) => (
              <span
                className={`rounded text-sm font-normal py-1 px-2 cursor-pointer ${theme.lightBackground} text-gray-500`}
              >
                {brd}
              </span>
            ))
          ) : (
            <h3 className="text-gray-500 font-normal">None</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default State;
