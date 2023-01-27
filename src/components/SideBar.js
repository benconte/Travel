import React, { useContext } from "react";
import { AppContext } from "../context/MainContext";
import { Link } from "react-router-dom";

function SideBar() {
  const { theme } = useContext(AppContext);

  const itemStyles = `my-4 ${theme.primaryText} text-xs font-medium cursor-pointer tracking-wide`;

  return (
    <div
      className={`hidden md:block w-48 ${theme.sidebarBackground} h-full px-8 border-r border-solid ${theme.sidebarBorder} fixed top-0 left-0 `}
    >
      <Link to={`/`} className={`hover:no-underline`}><header className={`py-6 font-bold text-2xl ${theme.logo}`}>BAG</header></Link>
      <ul className="list-none m-0">
        <Link to={`/`} className={`hover:no-underline ${theme.primaryText}`}>
          <li className={itemStyles}>MY LIST</li>
        </Link>
        <Link to={`/visited`} className={`hover:no-underline ${theme.primaryText}`}>
          <li className={itemStyles}>VISITED</li>
        </Link>
        <Link to={`/toVisit`} className={`hover:no-underline ${theme.primaryText}`}>
          <li className={itemStyles}>TO VISIT</li>
        </Link>
      </ul>
    </div>
  );
}

export default SideBar;
