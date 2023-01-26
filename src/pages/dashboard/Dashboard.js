import React, {useContext} from 'react'
// import { signOut } from 'firebase/auth'
import SideBar from '../../components/nav/SideBar'
import TopNav from '../../components/nav/TopNav';
import MyList from './MyList';
import { AppContext } from '../../context/MainContext';
function Home() {
  const { theme } = useContext(AppContext)
  return (
    <div className={`w-screen min-h-screen ${theme.background}`}>
      <SideBar />
      <main className='w-screen h-full pl-0 md:pl-48'>
        <TopNav />
        <MyList />
      </main>
    </div>
  )
}

export default Home

// <button type="button" onClick={() => signOut(auth)}>Logout</button>