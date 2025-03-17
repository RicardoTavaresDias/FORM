import { BrowserRouter } from "react-router"
import { Form } from './pages/Form'
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <BrowserRouter>
      {/* Toaster - é a messagem que aparece na tela confirmação ou erro  */}
      <Toaster />
      <Form />
    </BrowserRouter>
  )
}

export default App
