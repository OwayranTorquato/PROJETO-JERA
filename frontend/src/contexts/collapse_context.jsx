import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext(null)


export function CollpaseProvider( {children} ){
  const [collapsed, setCollapsed] = useState(true)
  return ( 
     <ThemeContext.Provider value = {{collapsed, setCollapsed}}>
          {children}
     </ThemeContext.Provider>
  )
}

