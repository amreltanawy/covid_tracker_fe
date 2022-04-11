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
          <PatientForm />
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Routes>
              <Route path="/about" element={<h2>about</h2>}/>
              <Route path="/users" element={<h2>users</h2>}/>
              <Route path="/" element={<h2>home</h2>}/>
            </Routes>
          </div>
        </Router>
    );
  } else {
    return (
        <Router>
          <Navbar/>
          <button onClick={loginWithRedirect}>Log in</button>
          </Router>

    );
  }
}

export default App;


