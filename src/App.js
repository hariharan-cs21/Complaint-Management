import React, { useState } from 'react';
import './App.css';
import { auth } from './config/firebaseconfig'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/login';
import Dashboard from './Components/Dashboard';
import { useAuthState } from 'react-firebase-hooks/auth';
import RaisedQuery from './Components/RaisedQuery';

function App() {
  const [isloggedIn, setloggedIn] = useState(localStorage.getItem("isLogged"))
  const [user] = useAuthState(auth)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setloggedIn={setloggedIn} />} />
        <Route path="/raisedquery" element={<RaisedQuery isloggedIn={isloggedIn} />} />
        <Route path="/dashboard" element={<Dashboard isloggedIn={isloggedIn} setloggedIn={setloggedIn} user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
