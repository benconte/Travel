import React, { useState, useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Switch from "./Switch";
import { AppContext } from "../../context/MainContext";
import bell from "../../utils/bell.svg";
import { Link } from "react-router-dom";

const profile = require("../../utils/profile.png");

function TopNav() {
  const { mode, theme } = useContext(AppContext);
  const [isDropdown, setIsDropDown] = useState(false);
  const [enabled, setEnabled] = useState(mode === "light" ? false : true);

  return (
    <div className="flex w-full h-20 items-center justify-between px-10">
      <Link to={`/`} className="hover:no-underline"><h2 className={`font-medium ${theme.primaryText} `}>My List</h2></Link>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <span className={`font-medium ${theme.darkText} uppercase`}>
          {mode === 'light'? "dark": "light"} MODE
          </span>
          <Switch enabled={enabled} setEnabled={setEnabled} />
        </div>
        {/* notification */}
        <div className="w-auto p-2 flex items-center justify-center bg-gray-200 rounded-full">
          <img src={bell} alt="Icon" className="h-[16px] w-[16px]" />
        </div>
        {/* profile */}
        <div className="flex items-center gap-3 relative">
          <p className={`text-sm font-medium ${theme.darkText}`}>
            <span className="text-gray-500">Hey,</span> Jane
          </p>
          <img
            src={profile}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-solid border-[#333] cursor-pointer"
            onClick={() => setIsDropDown(!isDropdown)}
          />

          {/* dropdown */}
          {isDropdown && (
            <div className={`absolute top-16 w-full h-[40px] bg-white border border-solid ${theme.sidebarBorder} rounded flex items-center`}>
              <div className="w-full h-full overflow-hidden">
                <button
                  type="button"
                  className={`text-gray-600 hover:${theme.profileDropdown} w-full h-full outline-none border-none px-3 hover:${theme.lightText}`}
                  onClick={() => signOut(auth)}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopNav;
