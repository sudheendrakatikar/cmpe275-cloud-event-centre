import React, { useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./Register";
import axios from "axios";
import './EventPage.css';
import { Link } from 'react-router-dom';
import EventNavbar from "./EventNavbar";
import { useSelector } from "react-redux";
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Sidebar from "./Sidebar";

function EventPage() {
  const user = useSelector((state) => state.user.currentUser);
  const [loading, setloading] = useState(false);
  const [event, setEvent] = useState([]);

  function getEvent() {
    try {
      setloading(true);
      axios.get("/api/event/" + localStorage.getItem("eventId")).then((response) => {
        console.log(response.data);
        setEvent(response.data);
      });
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }

  useEffect(() => {
    getEvent()
  }, []);

  const signupevents = () => {
    //e.preventDefault();
    axios.post(`/api/event/register`, null, {
      params: {
        userId: user.id,
        eventId: localStorage.getItem("eventId"),
      }
    })
      .then(response => response.status)
      .catch(err => alert(err.response.data));
  }

  return (
    <div>
      <EventNavbar />
      <div className="event-page-container">
        <div className="event-sidebar">
          <Sidebar />
        </div>
        <div className="event-container">
          <h1 className="event-title">{event.title}</h1>
          <div className="event-description">{event.description}</div>
          {/* <div className="event-owner event-text">by: {event.creator.screenName}</div> */}
          <div className="event-date event-text">
            <div className="event-start event-text">Start Time: {event.startTime}</div>
            <div className="event-text">End time: {event.endTime}</div>
          </div>


          <div className="event-fee event-text">Fee: {event.fee}$</div>
          <div className="event-date">
            <div className="event-start event-text">Min participant: {event.minimumParticipants}</div>
            <div className="event-text">Max participant: {event.maximumParticipants}</div>
          </div>
          {/* <div className="event-participants event-text">Current number of participants: {event.participants.length}</div> */}
          <button onClick={() => signupevents()}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
