import React, { useEffect, useState } from "react";
import Card from "./Card";
import Options from "./Options";
import Loader from "../../utils/loader/Loader";

function MyList() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = async (search) => {
    const searchWord = search;
    setSearch(searchWord);
    const newFilter = countries.filter((state) =>
      state.name.common.toLowerCase().includes(searchWord.toLowerCase())
    );
    /*
     * newFilter filters countries with the exact same characters included in their names
     * And changes them to lowercase to make sure they match
     */
    if (searchWord === "") {
      setFilteredCountries([]);
      const resp = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await resp.json();
      setCountries(data);
    } else if (filteredCountries) {
      setFilteredCountries(newFilter);
    }
  };

  // this function filters countries based on the continent
  const handleFilter = async (region) => {
    if (region === "All") {
      const resp = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await resp.json();
      setCountries(data);
    } else {
      await fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then((res) => res.json())
        .then((data) => {
          setCountries(data);
        });
    }
  };

  useEffect(() => {
    // we run an async func to get all countries from the api and add the to the state
    const getCountries = async () => {
      const resp = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await resp.json();
      setCountries(data);
    };
    getCountries();
  }, []);
  return (
    <div className="w-full h-full pb-5 px-8">
      {/* filter and search options */}
      <Options handleSearch={handleSearch} handleFilter={handleFilter} />

      {/* while we are fetching data, show loading */}
      {countries.length <= 0 && <Loader />}

      {/* if the user searches for a country which doesn't exits, show no result */}
      {filteredCountries.length === 0 && search !== "" && (
        <div className="text-lg font-medium text-center w-full">
          No result found
        </div>
      )}

      {/* if the search is empty and we have filtered countries  */}
      {filteredCountries && search !== "" && (
        <div className="w-full flex items-start flex-wrap gap-8 mt-5">
          {filteredCountries.map((country, key) => (
            <Card country={country} key={key} countries={countries} />
          ))}
        </div>
      )}

        {/* show countries if the search is empty and we haven't filtered countries */}
      {search === "" && filteredCountries.length <= 0 && (
        <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-5">
          {countries &&
            countries.map((country, key) => (
              <Card country={country} key={key} countries={countries} setCountries={setCountries} />
            ))}
        </div>
      )}
    </div>
  );
}

export default MyList;
