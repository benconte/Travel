import React, { useContext } from 'react'
import { Navigate } from "react-router-dom"
import { AuthContext } from './pages/auth/Auth'

// show component based on user auth status
// take the component and the rest of the props
function PrivateRoute({ children }) {
    const { currentUser } =  useContext(AuthContext)
    console.log(currentUser)
    if (!currentUser) {
      return <Navigate to='/login' />
    }
  return children;
}

export default PrivateRoute