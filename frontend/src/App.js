import './App.css';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Updated import
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function App() {

  const [users, setUsers] = useState([]);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="App">
      <Router>
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/signup" element={<Signup addUser={addUser} />} /> 
          <Route path="/dashboard" element={<Dashboard users={users} />} /> 
          <Route path="/" element={<Dashboard users={users} />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
