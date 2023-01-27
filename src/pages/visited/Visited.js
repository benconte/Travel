import React, { useContext } from 'react'
import TopNav from "../../components/TopNav"
import SideBar from "../../components/SideBar"
import VisitedCountries from "./VisitedCountries"
import { AppContext } from '../../context/MainContext'

function Visited() {
  const { theme } = useContext(AppContext);

  return (
    <div className={`w-screen min-h-screen ${theme.background}`}>
        <SideBar />
        <div className="w-screen h-full pl-0 md:pl-48">
            <TopNav />
            <VisitedCountries />
        </div>
    </div>
  )
}

export default Visited