import react from "react"
import {Routes, Route, Navigate} from "react-router-dom";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function Logout() {
  localStorage.clear()
  return <Navigate to='/login' />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
      <Routes>
        <Route
            exact
            path="*"
            element={
              <NotFound />
            }
        />
        <Route
            exact
            path="/register"
            element={
              <Register />
            }
        />
        <Route
            exact
            path="/login"
            element={
              <Login />
            }
        />
        <Route
            exact
            path="/"
            element={
              <ProtectedRoutes><Home /></ProtectedRoutes>
            }
        />
      </Routes>

  );
}

export default App;
