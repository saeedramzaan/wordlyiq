import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '/src/Style.css';
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Login({setIsLoggedIn}) {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   // const[isLoggedIn, setIsLoggedIn] = useState

    const login = async (e) => {

      e.preventDefault();

      try{

        


       // const response = await axios.post("http://localhost:8000/mapi/login",
        const response = await axios.post("https://lara-project-mocha.vercel.app/mapi/login",
          {
            email,
            password,
          }
        );


        localStorage.setItem("token", response.data.token);

      
        console.log(response.data.token);
      
        setIsLoggedIn(true); // Pass this value to app.jsx
        navigate('/home');

      } catch(err) {
        alert('login failed');
      }

    

    };
  
    useEffect(() => {

       }, [])

       

    return (

      

   <div className="container">

<Form onSubmit={login}>
<Row className="my-3">
                    <Col>
                      <Form.Group controlId="mobile_no">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Email"  onChange={(event) => {
                          setEmail(event.target.value)
                        }} />
                      </Form.Group>

                      <Form.Group controlId="mobile_no">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" onChange={(event) => {
                          setPassword(event.target.value)
                          
                        }} />
                      </Form.Group>
                    </Col>
               
                    
                    <Col>
                  
                    </Col>

                        <Row>
                            <Col>
                    <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Login
                  </Button>
                  </Col>
                  </Row>


                  </Row>
                  </Form>


  {/* <form onSubmit={login}>

    <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />

    <input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />

      <button type="submit">Login</button>'
        
        </form> */}

</div>
    
    )
}