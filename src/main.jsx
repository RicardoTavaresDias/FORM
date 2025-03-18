import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.jsx'

import { AlertProvider } from "./context/AlertContext"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlertProvider>  
      <App />
    </AlertProvider>
  </StrictMode>,
)
