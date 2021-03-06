import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Oauth from "./components/Oauth";
import CreateEvent from "./components/CreateEvent";
import EventDashboard from "./components/EventDashboard";
import EventPage from "./components/EventPage";
import Temp from "./components/Temp";
import { useSelector } from "react-redux";
import SignIn from "./components/SignIn";
import VerifyAccount from "./components/VerifyAccount";
import SignUpForum from "./components/SignUpForum";
import Account from "./components/Account";
import UserProfile from "./components/UserProfile";
import OrganizerProfile from "./components/OrganizerProfile";
import SystemReport from "./components/SystemReport";
import UserReport from "./components/UserReport";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  console.log("In app the user: " + JSON.stringify(user));
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/event-dashboard" /> : <SignIn />}
          />
          <Route
            path="/register"
            element={user ? <EventDashboard /> : <Register />}
          />
          <Route
            path="/create-event"
            element={user ? <CreateEvent /> : <Navigate to="/" />}
          />
          <Route
            path="/event-dashboard"
            element={user ? <EventDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/event-page"
            element={user ? <EventPage /> : <Navigate to="/" />}
          />
          <Route
            path="/verify-account"
            element={
              user ? <Navigate to="/event-dashboard" /> : <VerifyAccount />
            }
          />
          <Route
            path="/account"
            element={user ? <Account /> : <Navigate to="/" />}
          />
          {/* <Route
            path="/userprofile/:id"
            element={user ? <UserProfile /> : <Navigate to="/" />}
          /> */}
          <Route
            path="/orgprofile"
            element={user ? <OrganizerProfile /> : <Navigate to="/" />}
          />
          <Route
            path="/system-report"
            element={user ? <SystemReport /> : <Navigate to="/" />}
          />
           <Route
            path="/user-report"
            element={user ? <UserReport /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
