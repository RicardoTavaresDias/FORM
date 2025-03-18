import { createContext } from "react";
import { useState } from "react";

export const AlertContext = createContext()

export function AlertProvider({children}){
  const [close, setClose] = useState(false)
  const [message, setMessage] = useState({})

  function openAlert(value){
    setClose(true)
    setMessage({ value })
  }

 console.log(close)
  return(
    <AlertContext.Provider value={{ close, openAlert, message, setClose }}>
      {children}
    </AlertContext.Provider>
  )
}