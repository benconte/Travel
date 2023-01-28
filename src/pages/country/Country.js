import React, {useContext, useState,useEffect} from 'react'
import TopNav from '../../components/TopNav'
import SideBar from '../../components/SideBar'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/MainContext'
import State from './State'

function Country() {
    const [country, setCountry] = useState()
    const { theme } = useContext(AppContext)
    const url = useParams()

    useEffect(() => {
      // we fetch the selected country from the api and save it to the country state
      fetch(`https://restcountries.com/v3.1/name/${url.name}?fullText=true`)
      .then(res => res.json())
      .then(data => {
        setCountry(data[0])
      })
    }, [])
    
  return (
    <div className={`w-full min-h-screen ${theme.background}`}>
        <SideBar />
        <div className="w-full h-full pl-0 md:pl-48">
            <TopNav type="countryView" />
            {country && <State country={country} />}
        </div>
    </div>
  )
}

export default Country