import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Positions from "./pages/positions/Positions";
import NotFound from "./pages/NotFound";
import Layout from "./components/common/Layout";
import PositionDetails from "./pages/positions/PositionDetails";
import CreatePosition from "./pages/positions/CreatePositions";
import CreateAttribute from "./pages/attributes/createAttribute";
import EditAttribute from "./pages/attributes/EditAttribute";
import EditPosition from "./pages/positions/EditPositions";
import Attributes from "./pages/attributes/Attributes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import AdminRoute from "./components/common/AdminRoute";
import AdminPage from "./pages/AdminPage";
import CreateCV from "./pages/CVs/CreateCV";
import CVDetails from "./pages/CVs/CVDetails";
import RoleRoute from "./components/common/RoleRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>

          <Route element={<PublicRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route index element={<Home />} />
          <Route path="positions" element={<Positions />} />
          <Route path="positions/:id" element={<PositionDetails />} />

          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="positions/:id/cv/new" element={<CreateCV />} />
            <Route path="cvs/:id" element={<CVDetails />} />
          </Route>

          <Route element={<RoleRoute roles={["ADMIN", "RECRUITER"]} />}>
            <Route path="positions/new" element={<CreatePosition />} />
            <Route path="positions/:id/edit" element={<EditPosition />} />

            <Route path="attributes" element={<Attributes />} />
            <Route path="attributes/new" element={<CreateAttribute />} />
            <Route path="attributes/:id/edit" element={<EditAttribute />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path='admin' element={<AdminPage />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;