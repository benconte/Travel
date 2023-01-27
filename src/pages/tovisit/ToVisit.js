import React, { useContext } from "react";
import SideBar from "../../components/SideBar";
import TopNav from "../../components/TopNav";
import { AppContext } from "../../context/MainContext";
import Countries from "./Countries"

function ToVisit() {
  const { theme } = useContext(AppContext);

  return (
    <div className={`w-screen min-h-screen ${theme.background}`}>
      <SideBar />
      <main className="w-screen h-full pl-0 md:pl-48">
        <TopNav />
        <Countries />
      </main>
    </div>
  );
}

export default ToVisit;
