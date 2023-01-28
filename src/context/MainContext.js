import React, { createContext, useState } from 'react'

export const AppContext = createContext()

function MainContext({ children }) {
  // set the default theme  
  const [themeColors, ] = useState({
    dark: {
      primaryText: "text-white",
      secondaryText: "text-[#f7f7f7]",
      background: "bg-[#111]",
      sidebarBackground: "bg-[#222]",
      itemBackground: "bg-[#444]",
      lightText: "text-[#444]",
      darkText: "text-[#f9f9f9]",
      logo: "text-white",
      sidebarBorder: "border-[#333]",
      profileBorder: "border-white", 
      profileDropdown: "bg-white",
      cardBackground: "#333",
      lightBackground: "bg-[#F2F2F2]",
      darkBackground: "bg-[#333]"
    },
    light: {
      primaryText: "text-black",
      secondaryText: "text-[#333]",
      lightText: "text-[#f9f9f9]",
      darkText: "text-[#333]",
      background: "bg-white",
      // background: "bg-[#FAFAFA]",
      sidebarBackground: "bg-white",
      itemBackground: "bg-grey-400",
      logo: "text-black",
      sidebarBorder: "border-gray-200",
      profileBorder: "border-[#333]", 
      profileDropdown: "bg-black",
      cardBackground: "#F2F2F2",
      lightBackground: "bg-[#F2F2F2]",
      darkBackground: "bg-[#333]"
    }
  })
  localStorage.setItem("theme", "light") // we store the theme in localstorage for future use
  const [mode, setMode] = useState(localStorage.getItem("theme"))
  const [theme, setTheme] = useState(themeColors[mode])
  
  // we change the theme based on the parameter
  const changeTheme = (thm) => {
    localStorage.setItem("theme", thm)
    setMode(thm)
    setTheme(themeColors[thm])
  }
  return (
    <AppContext.Provider value={{
      mode, 
      changeTheme,
      themeColors,
      theme
    }}>
      {/* all children inside of this context will be able to use the context */}
      {children}
    </AppContext.Provider>
  )
}

export default MainContext