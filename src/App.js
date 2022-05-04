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
import { useAuth0 } from '@auth0/auth0-react';
import Dashboard from "./Pages/Dashboard";
import UserProfile from "./Pages/UserProfile";
import LoginScreen from "./Component/LoginScreen";

function App() {

  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
        <Router>
          <Navbar/>
          <div>


            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Routes>
              <Route path="/about" element={<h2>about</h2>}/>
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
          <LoginScreen onClick={loginWithRedirect}/>
        </Router>

    );
  }
}

export default App;


