import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Positions from "./pages/Positions";
import CVs from "./pages/CVs";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import PositionDetails from "./pages/PositionDetails";
import CreatePosition from "./pages/CreatePositions";
import CreateAttribute from "./pages/CreateAttribute";
import EditAttribute from "./pages/EditAttribute";
import EditPosition from "./pages/EditPositions";
import Attributes from "./pages/Attributes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/positions' element={<Positions />} />
          <Route path='/positions/:id' element={<PositionDetails />} />
          <Route path='/positions/new' element={<CreatePosition/>} />
          <Route path='/positions/:id/edit' element={<EditPosition />} />
          <Route path='/attributes/new' element={<CreateAttribute />}/>
          <Route path='/attributes' element={<Attributes />} />
          <Route path='/attributes/:id/edit' element={<EditAttribute />} />
          <Route path='/cvs' element={<CVs />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;