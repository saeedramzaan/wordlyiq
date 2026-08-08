import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import ProtectedRoute from './ProtectedRoute';
// import './App.css'

import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';


import { useNavigate } from "react-router-dom";
// import ProtectedRoute from "./ProjtectedRoute";

import { BrowserRouter as Router , Routes, Route, Link, useLocation } from "react-router-dom";


// import ListWord from "./components/page/list.component";
// import VerbList from "./components/page/listVerb.component";
// import Create from "./components/page/create.component";
// import CreateVerb from "./components/page/createVerb.component";
import Home from "./components/home";
import Login from "./components/login";
import { Button } from "react-bootstrap";

function App() {

  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("token");

  const logout = async () => {

    const token = localStorage.getItem("token");

    console.log(token);
    await axios.post("https://lara-project-mocha.vercel.app/mapi/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
 );

 
    localStorage.removeItem("token");
     navigate("/login");

   }

  return (<>
    <Navbar bg="primary">

      <Container>
        
         {location.pathname == "/login" && ( 
        <Link to={"/"} className="navbar-brand text-white">
          Login
        </Link>
         )} 

       {isLoggedIn && location.pathname == "/home" && ( 
        <Link to={"/home"} className="navbar-brand text-white">
          Home
        </Link>
         )}
       

        {isLoggedIn && (
    
      <Button type="submit" onClick={logout} class="form-submit-button ms-auto" style={{marginLeft:"auto"}}
      >Logout</Button>

        )}


      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/> 
            {/* <Route exact path='/' element={<ProtectedRoute>< Home/></ProtectedRoute>} />
            <Route exact path='/wordList' element={<ProtectedRoute>< ListWord /></ProtectedRoute>} />
            <Route exact path='/verbList' element={<ProtectedRoute>< VerbList /></ProtectedRoute>} />
            <Route exact path='/create' element={<ProtectedRoute>< Create /></ProtectedRoute>} />
            <Route exact path='/createVerb' element={<ProtectedRoute><CreateVerb /></ProtectedRoute>} />
            <Route exact path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/> */}
           
          </Routes>
        </Col>
      </Row>
    </Container>
  </>);
   
}

export default App;