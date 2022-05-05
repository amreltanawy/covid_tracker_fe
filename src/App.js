import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from "./Component/Navbar";
import PatientForm from "./Component/PatientForm";
import Dashboard from "./Pages/Dashboard";
import UserProfile from "./Pages/UserProfile";
import LoginScreen from "./Component/LoginScreen";
import LoginForm from "./Component/LoginForm";
import {isAuthenticated} from "./Services/AuthService";
function App() {




  if (isAuthenticated()) {
    return (
        <Router>
          <Navbar/>
          <div>


            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Routes>
              <Route path="/users" element={<UserProfile />}/>
              <Route path="/" element={<Dashboard />}/>
            </Routes>
          </div>
        </Router>
    );
  } else {
    return (
        <Router>
          <Navbar/>
          <LoginForm />
        </Router>

    );
  }
}

export default App;


