import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/MainContext";

function NotFound() {
  const { theme } = useContext(AppContext);
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${theme.background} mx-auto mt-32 ${theme.primaryText} gap-3`}
    >
      <h1 className="font-bold text-3xl">404 Page Not Found</h1>
      <Link to={"/"} className="text-[#0095f6] text-base">Go To Dashboard</Link>
    </div>
  );
}

export default NotFound;
