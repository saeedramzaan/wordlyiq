import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Home from "./components/home";
import Login from "./components/login";
import List from "./components/list";
import Create from "./components/create";


function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const logout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://lara-project-mocha.vercel.app/mapi/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>

        {( location.pathname === "/") && (
            <Link to="/home" className="navbar-brand text-white">
              Home
            </Link>
          )}
     

          {( location.pathname === "/login") && (
            <Link to="/login" className="navbar-brand text-white">
              Login
            </Link>
          )}


          {isLoggedIn && location.pathname === "/home" && (
            <Link to="/home" className="navbar-brand text-white">
              Home
            </Link>
          )}

          {( location.pathname === "/list") && (
            <Link to="/home" className="navbar-brand text-white">
              Home
            </Link>
          )}

          {isLoggedIn && (
            <Button
              type="button"
              onClick={logout}
              className="ms-auto"
            >
              Logout
            </Button>
          )}
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Routes>

            {/* {isLoggedIn && location.pathname === "/" && (
             <Route
             path="/home"
             element={
               <ProtectedRoute>
                 <Home/>
               </ProtectedRoute>
             }
           />
          )} */}

            <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home/>
                    </ProtectedRoute>
                }
              />


              <Route
                path="/login"
                // element={<Login setIsLoggedIn={setIsLoggedIn} />}
                  element={isLoggedIn ? <Navigate to="/" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />}
              />

              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/list"
                element={
                  <ProtectedRoute>
                    <List/>
                  </ProtectedRoute>
                }
              />


                <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <Create/>
                  </ProtectedRoute>
                }
              />

             
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;