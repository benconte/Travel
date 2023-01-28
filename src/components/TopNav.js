import React, { useState, useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Switch from "./Switch";
import { AppContext } from "../context/MainContext";
import bell from "../utils/images/bell.svg";
import { AuthContext } from "../pages/auth/Auth";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";

const profile = require("../utils/images/profile.png");

function TopNav() {
  const { mode, theme, changeTheme } = useContext(AppContext);
  const { currentUser } = useContext(AuthContext);
  const [isDropdown, setIsDropDown] = useState(false);
  const [enabled, setEnabled] = useState(mode === "light" ? false : true);

  // this function changes the theme. It is passed down to the children components as a prop
  const handleTheme = () => {
    if (enabled) {
      changeTheme("light");
      setEnabled(false);
    } else {
      changeTheme("dark");
      setEnabled(true);
    }
  };

  return (
    <div className="flex w-full h-20 items-center justify-between px-10">
      <h2 className={`font-medium ${theme.primaryText} `}>My List</h2>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          <span className={`font-medium ${theme.darkText} uppercase`}>
            {mode === "light" ? "dark" : "light"} MODE
          </span>
          <Switch
            enabled={enabled}
            setEnabled={setEnabled}
            handleTheme={handleTheme}
          />
        </div>
        <div className="flex items-center md:hidden">
          {mode === "light" ? (
            <div className="flex items-center gap-2">
              <NightlightOutlinedIcon
                onClick={() => handleTheme()}
                className={`text-2xl cursor-pointer ${theme.primaryText} -rotate-45`}
              />
              <span className={`text-sm ${theme.darkText} uppercase`}>
                {mode === "light" ? "dark" : "light"} MODE
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Brightness5OutlinedIcon
                onClick={() => handleTheme()}
                className={`text-2xl cursor-pointer ${theme.primaryText}`}
              />
              <span className={`text-sm ${theme.darkText} uppercase`}>
                {mode === "light" ? "dark" : "light"} MODE
              </span>
            </div>
          )}
        </div>
        {/* notification */}
        <div className="hidden w-auto p-2 md:flex items-center justify-center bg-gray-200 rounded-full">
          <img src={bell} alt="Icon" className="h-[16px] w-[16px]" />
        </div>
        {/* profile */}
        <div className="flex items-center gap-3 relative">
          <p
            className={`hidden md:block text-sm font-medium ${theme.darkText}`}
          >
            <span className="text-gray-500">Hey,</span>{" "}
            {currentUser.displayName}
          </p>
          {/* when the images i click, the logout dropdown will toggle */}
          <img
            src={profile}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-solid border-[#333] cursor-pointer"
            onClick={() => setIsDropDown(!isDropdown)}
          />

          {/* dropdown */}
          {isDropdown && (
            <div
              className={`z-10 absolute top-16 w-full h-[40px] bg-white border border-solid ${theme.sidebarBorder} rounded flex items-center`}
            >
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
