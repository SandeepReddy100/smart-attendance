// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import Leaderboard from './pages/LeaderBoardPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile'; 
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={() => setIsAuthenticated(true)} />
          }
        />
         <Route 
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        <Route 
          path="/leaderboard"
          element={
            isAuthenticated ? <Leaderboard /> : <Navigate to="/login" />
          }
        />
      <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
