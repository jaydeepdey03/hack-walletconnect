import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import {GlobalContextProvider} from "./context/GlobalContext";

function App() {
  return (
    <>
      <GlobalContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </GlobalContextProvider>
    </>
  );
}

export default App;
