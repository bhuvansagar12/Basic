import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './loginpage';
import AuthenticatedPage from './AuthenticatedPage';
import ContactPage from './ContactPage';
import StudentPage from './StudentPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? '/authenticated' : '/login'} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/authenticated" element={isLoggedIn ? <AuthenticatedPage /> : <Navigate to="/login" />} />
        <Route path="/contact" element={isLoggedIn ? <ContactPage /> : <Navigate to="/login" />} />
        <Route path="/student/all" element={isLoggedIn ? <StudentPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;