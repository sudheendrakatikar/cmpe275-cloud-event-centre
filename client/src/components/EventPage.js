import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./Register";
import axios from "axios";
import './temp.css';
import { Link } from 'react-router-dom';

function EventPage() {


  const [hotels, sethotels] = useState([]);


  useEffect(() => {
    try {
        axios.get("/api/event/"+localStorage.getItem("event_name")).then((response) => {
        sethotels(response.data);
      });
      console.log(hotels);
    } catch (error) {
      console.log(error);
    }
  }, []);

  
  return (
    <body>
        
    
    <div class="card text-center">
  <div class="card-header">
    {hotels.status}
  </div>
  <div class="card-body">
    <h5 class="card-title">{hotels.title}</h5>
    <p class="card-text">{hotels.description}</p>
    {/* <a href="#" class="btn btn-primary">Back</a> */}
    <Link to="/eventdash">
        <a class="btn btn-primary">Back</a>
    </Link>
  </div>
  <div class="card-footer text-muted">
    {hotels.startTime} to {hotels.endTime}
  </div>
</div>

      
    </body>
  );
}

export default EventPage;
