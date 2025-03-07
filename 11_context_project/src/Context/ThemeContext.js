import React, { createContext, useContext } from "react";

export  const ThemeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
});
export  const  ThemeContextProvider = ThemeContext.Provider 

export function UseTheme(){
    return useContext(ThemeContext)
}