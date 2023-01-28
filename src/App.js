import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/dashboard/Dashboard";
import { AuthProvider } from "./pages/auth/Auth";
import PrivateRoute from "./route/PrivateRoute";
import MainContext from "./context/MainContext";
import Country from "./pages/country/Country";
import ToVisit from "./pages/tovisit/ToVisit";
import Visited from "./pages/visited/Visited";
import NotFound from "./pages/NotFound"
// the App component contains all the routes of our app
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
              path="/country/:name"
              element={
                <PrivateRoute>
                  <Country />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/toVisit"
              element={
                <PrivateRoute>
                  <ToVisit />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/visited"
              element={
                <PrivateRoute>
                  <Visited />
                </PrivateRoute>
              }
            />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="*"element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      </MainContext>
    </AuthProvider>
  );
}

export default App;
