import { BrowserRouter } from "react-router";
import { Form } from "./pages/Form";

import { useAlert } from "./context/AlertContext";
import { Alert } from "./components/Alert";

function App() {
  const { close } = useAlert();

  return (
    <BrowserRouter>
      {close && <Alert />}
      <Form />
    </BrowserRouter>
  );
}

export default App;
