import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import { Link } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errCode, setErrCode] = useState()

  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, password } = e.target.elements;

    try {
      await register(email.value, password.value, username.value);
      navigate("/");
    } catch (err) {
      setErrCode(err.code)

      if(err.code === "auth/email-already-in-use") {
        setErrCode("Email already exists. Choose another")
      }
    }
  };
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
              <form onSubmit={handleSignup}>
                <div className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    require
                    className="bg-[#f3f3f3] w-full p-3 border border-solid border-[rgb(219, 219, 219)] outline-none rounded-md "
                  />
                  <input
                    type="email"
                    placeholder="example@mail.com"
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
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center text-sm">
            <p>
              Already have an account? <Link to={'/login'} className="text-[#0095f6]">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
