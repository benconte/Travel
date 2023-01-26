import React, { useContext } from "react";
import { AppContext } from "../../context/MainContext";

function SideBar() {
  const {theme } = useContext(AppContext);

  const itemStyles = `my-4 ${theme.primaryText} text-xs font-medium cursor-pointer tracking-wide`;

  return (
    <div
      className={`w-48 ${theme.sidebarBackground} h-full px-8 border-r border-solid ${theme.sidebarBorder} fixed top-0 left-0 `}
    >
      <header className={`py-6 font-bold text-2xl ${theme.logo}`}>BAG</header>
      <ul className="list-none m-0">
        <li className={itemStyles}>MY LIST</li>
        <li className={itemStyles}>VISITED</li>
        <li className={itemStyles}>TO VISIT</li>
      </ul>
    </div>
  );
}

export default SideBar;
