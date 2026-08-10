import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '/src/Style.css';
import { useNavigate } from 'react-router-dom'




export default function Home() {

 
    const home = async (e) => {
      console.log('test');

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://lara-project-mocha.vercel.app/mapi/user",
        {
          headers: {
            Authorization : `Bearer ${token}`,
            Accept : "application/json"
          }
        }
      ); 

      console.log(response.data.name);

     // e.preventDefault();
      
    };
    
    useEffect(() => {
         home();
        // fetch();
       }, [])




    return (

      

   <div className="container">


  <div className="d-flex justify-content-evenly">
    <Link className="btn btn-primary mb-2" to={"/list"}>
      Create English Words
    </Link>
    
  </div>


</div>
    
    )
}