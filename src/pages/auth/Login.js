import React, { useContext, useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from './Auth';

export default function Login() {
  const navigate = useNavigate()
  const [errCode, setErrCode] = useState()
  const { signIn } = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = e.target.elements;

    try {
      await signIn(email.value, password.value)
      navigate("/")
    } catch (err) {
      setErrCode(err.code)

      if(err.code === "auth/invalid-email") {
        setErrCode("The provided value for the email user property is invalid. It must be a string email address")
      } else if (err.code === "auth/user-not-found") {
        setErrCode("User doesn't exists. Check your email and password")
      }
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex h-auto p-0 mt-4">
        <div className="w-[350px] h-auto block">
          <div className="w-full h-auto bg-white border border-solid border-[rgb(219,219,219)] text-[rgb(38,38,38)] p-8 mb-4 flex flex-col items-center rounded">
            <div className="mb-5">
              <header className="text-center font-medium text-lg">
                Travel
              </header>
              <span className="text-center font-sm text-gray-400">Travel arround the world with us</span>
            </div>
            {/* error handling */}
            <div className="w-full text-center">
              <p className="text-red-700 font-medium">{errCode && errCode}</p>
            </div>
            <div className="w-full h-auto flex flex-col justify-start">
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-4">
                  <input
                    type="email"
                    placeholder="Email...."
                    name="email"
                    require
                    className="bg-[#f3f3f3] w-full p-3 border border-solid border-[rgb(219, 219, 219)] outline-none rounded-md "
                  />
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    required
                    className="bg-[#f3f3f3] w-full p-3 border border-solid border-[rgb(219, 219, 219)] outline-none rounded-md "
                  />

                  <button
                    type="submit"
                    className="w-full bg-[#0095f6] p-2 text-lg text-white text-center rounded border border-solid border-transparent font-bold outline-none cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center text-sm">
            <p>
              Don't have an account? <Link to={'/register'} className="text-[#0095f6]">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
