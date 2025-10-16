import react, {useEffect, useState} from "react"
import {Routes, Route, Navigate} from "react-router-dom";
import {Provider} from "react-redux";
import {UserContext} from "../user-content/UserContent";
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
    const [currentUser, setCurrentUser] = useState(null)

    const userContextValue = {

    }
    return (
        <UserContext.Provider value={userContextValue}>
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
        </UserContext.Provider>

    );
}

export default App;
