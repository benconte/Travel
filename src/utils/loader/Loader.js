import React, { useContext } from 'react'
import { AppContext } from '../../context/MainContext'

function Loader() {
    const { theme } = useContext(AppContext)
  return (
    <div className={`w-full h-full mx-auto mt-15 md:mt-32 ${theme.primaryText}`}>
        <h2 className="font-medium tex-2xl text-center">Loading data...</h2>
    </div>
  )
}

export default Loader