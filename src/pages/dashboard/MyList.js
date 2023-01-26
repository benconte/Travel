import React, { useEffect, useState } from "react";
import Card from "./Card";
import Options from "./Options";

function MyList() {
  const [countries, setCountries] = useState([]);

  const handleSearch = (search) => {};

  const handleFilter = (option) => {};

  useEffect(() => {
    const getCountries = async () => {
      const resp = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await resp.json();
      setCountries(data);
      console.log(data);
    };
    getCountries();
  }, []);
  return (
    <div className="w-full h-full pb-5 px-8 ">
      {/* filter and search options */}
      <Options handleSearch={handleSearch} handleFilter={handleFilter} />

      <div className="w-full flex items-start flex-wrap gap-8 mt-5">
        {countries &&
          countries.map((country, key) => <Card country={country} key={key} />)}
      </div>
    </div>
  );
}

export default MyList;
