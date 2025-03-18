import { useContext } from "react";
import { AlertContext } from "../context/AlertContext.jsx";

export function useAlert(){
  const context = useContext(AlertContext)

  return context
}