import React, { useState, useContext } from "react";
import search from "../../utils/images/search.svg";
import chevrondown from "../../utils/images/chevrondown.svg";
import { AppContext } from "../../context/MainContext";
import ClickAwayListener from "@mui/base/ClickAwayListener";

function Options({ handleSearch, handleFilter }) {
  //   const [seach, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState();
  const { theme } = useContext(AppContext);

  const filterBySearch = (e) => {
    // setSearch(target.value)
    handleSearch(e.target.value);
  };

  // this function calls the handleFilter function in the parent, and passes some rules
  const filt = ({ target }) => {
    handleFilter(target.innerHTML);
  };
  const handleClick = () => { // this part controlls the profile dropdown
    setIsDropdownOpen((prev) => !prev);
  };

  // this function hides the dropdown when the user clicks on an element which is not a chid of this component
  const handleClickAway = () => { 
    setIsDropdownOpen(false);
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="w-full sm:h-auto md:h-16 sm:block md:flex items-center justify-between">
        <div
          className={`flex items-center ${theme.lightBackground} h-12 rounded-lg px-4 mb-4 md:mb-0 gap-4`}
        >
          <img src={search} alt="Search" />
          <input
              type="search"
              placeholder="Search For a Country...."
              className="w-full border-none outline-none bg-transparent h-full"
              onChange={(e) => filterBySearch(e)}
            />
        </div>
        {/* filter section */}
        <div className="relative flex items-center">
          <button
            type="button"
            className={`outline-none flex items-center gap-2 px-5 ${theme.lightBackground} rounded-lg h-12 cursor-pointer`}
            onClick={handleClick}
          >
            <span className="font-normal text-lg">Filter by region</span>
            <img src={chevrondown} alt="dropdown" />
          </button>
          {/* dropdown */}
          {isDropdownOpen && (
            <div
              className={`absolute top-14 w-full flex items-center flex-col ${theme.lightBackground} rounded-lg`}
            >
              <span
                className={`h-10 text-lg cursor-pointer w-full flex items-center justify-center hover:bg-[#d9d9d9] text-black`}
                onClick={(e) => filt(e)}
              >
                All
              </span>
              <span
                className={`h-10 text-lg cursor-pointer w-full flex items-center justify-center hover:bg-[#d9d9d9] text-black`}
                onClick={(e) => filt(e)}
              >
                Africa
              </span>
              <span
                className={`h-10 text-lg cursor-pointer w-full flex items-center justify-center hover:bg-[#d9d9d9] text-black`}
                onClick={(e) => filt(e)}
              >
                America
              </span>
              <span
                className={`h-10 text-lg cursor-pointer w-full flex items-center justify-center hover:bg-[#d9d9d9] text-black`}
                onClick={(e) => filt(e)}
              >
                Asia
              </span>
              <span
                className={`h-10 text-lg cursor-pointer w-full flex items-center justify-center hover:bg-[#d9d9d9] text-black`}
                onClick={(e) => filt(e)}
              >
                Europe
              </span>
              <span
                className={`h-10 text-lg cursor-pointer w-full flex items-center justify-center hover:bg-[#d9d9d9] text-black`}
                onClick={(e) => filt(e)}
              >
                Oceania
              </span>
            </div>
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default Options;
