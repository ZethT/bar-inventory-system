import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CContainer, CHeader } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Items from './pages/Items';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <Router>
      <CHeader>
        <NavBar user={user} setUser={setUser} />
      </CHeader>
      <CContainer fluid>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
          <Route path="/" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/items" element={user ? <Items user={user} /> : <Navigate to="/login" />} />
          <Route path="/inventory" element={user ? <Inventory user={user} /> : <Navigate to="/login" />} />
          <Route path="/orders" element={user ? <Orders user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </CContainer>
    </Router>
  );
}

export default App;