import "./EventPage.css";
import EventNavbar from "./EventNavbar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function OrganizerProfile() {

    const [user,setUser] = useState([]);
    const [review,setReview] = useState([]);
    useEffect(() => {
        try {
            var userlocal = JSON.parse(localStorage.getItem('approveuser')).id;
            console.log(localStorage.getItem('approveuser'));


            axios
            .get("/api/review/organizer",{
                params: {
                    id: userlocal
                }
            })
            .then((response) => {
                console.log(response.data);
                 setReview(response.data);
            })
            .catch((err) => {
              console.log(err);
            });


          axios
            .get("/api/user",{
                params: {
                    id: userlocal
                }
            })
            .then((response) => {
                console.log(response.data);
                 setUser(response.data);
            })
            .catch((err) => {
              console.log(err);
            });
    
        } catch (error) {
          console.log(error);
          
        }
      }, []);



    return(
        <div>
        <EventNavbar />
        <div className="event-page-container">
        <div className="event-container">
          <h1 className="event-title">{user.fullName}</h1>
          <div className="event-description">{user.description}</div>
          {/* <div className="event-gender"><b>Gender</b>  {user.gender}</div> */}
          <div className="event-owner event-text">
            <b>Screen Name</b> {user.screenName}
          </div>
          <div
            className="event-date event-text"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="event-text">
              <b>Email  </b> {user.email}
            </div>

            <div className="event-text">
              <b>Reviews  </b> 
            </div>
          </div>
          {review.map((request) => {
              return (
                <Card variant="outlined" sx={{ minWidth: 275 }}>
                  <CardContent>
                  <Typography variant="h6" component="div">
                  <b>Rating</b>  : <b>{request.rating}</b>  
                    </Typography>
                    <Typography variant="h6" component="div">
                      <b>{request.event.title}</b>   : {request.text}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })} 
        </div>  
      </div>
      </div>
    );
  }
  
  export default OrganizerProfile;