import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/dashboard/Dashboard";
import { AuthProvider } from "./pages/auth/Auth";
import PrivateRoute from "./PrivateRoute";
import MainContext from "./context/MainContext";
import Country from "./pages/country/Country";

function App() {
  
  return (
    <AuthProvider>
      <MainContext>
      <Router>
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/country/:flag"
              element={
                <PrivateRoute>
                  <Country />
                </PrivateRoute>
              }
            />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
      </MainContext>
    </AuthProvider>
  );
}

export default App;
