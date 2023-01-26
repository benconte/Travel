import React, {useContext, useState,useEffect} from 'react'
import TopNav from '../../components/nav/TopNav'
import SideBar from '../../components/nav/SideBar'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/MainContext'
import State from './State'

function Country() {
    const [country, setCountry] = useState()
    const { theme } = useContext(AppContext)
    const url = useParams()
    console.log(url.name)

    useEffect(() => {
      fetch(`https://restcountries.com/v3.1/name/${url.name}?fullText=true`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setCountry(data[0])
      })
    }, [])
    
  return (
    <div className={`w-screen min-h-screen ${theme.background}`}>
        <SideBar />
        <div className="w-full h-full pl-0 md:pl-48">
            <TopNav type="countryView" />
            {country && <State country={country} />}
        </div>
    </div>
  )
}

export default Country