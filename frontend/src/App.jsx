import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Positions from "./pages/positions/Positions";
import CVs from "./pages/CVs/CVs";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import PositionDetails from "./pages/positions/PositionDetails";
import CreatePosition from "./pages/positions/CreatePositions";
import CreateAttribute from "./pages/attributes/createAttribute";
import EditAttribute from "./pages/attributes/EditAttribute";
import EditPosition from "./pages/positions/EditPositions";
import Attributes from "./pages/attributes/Attributes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>

          <Route element={<PublicRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route index element={<Home />} />
          <Route path="positions" element={<Positions />} />
          <Route path="positions/:id" element={<PositionDetails />} />

          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="cvs" element={<CVs />} />
            <Route path="positions/new" element={<CreatePosition />} />
            <Route path="positions/:id/edit" element={<EditPosition />} />
            <Route path="attributes" element={<Attributes />} />
            <Route path="attributes/new" element={<CreateAttribute />} />
            <Route path="attributes/:id/edit" element={<EditAttribute />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;