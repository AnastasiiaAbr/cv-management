import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Positions from "./pages/Positions";
import CVs from "./pages/CVs";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import PositionDetails from "./pages/PositionDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/positions' element={<Positions />} />
          <Route path='/positions/:id' element={<PositionDetails />} />
          <Route path='/cvs' element={<CVs />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;