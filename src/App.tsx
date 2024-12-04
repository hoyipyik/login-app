// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import AppPage from './pages/AppPage/AppPage';

const App: React.FC = () => {
  return (
    // <AppPage />
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <AppPage />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/app" replace />} />
      </Routes>
    </Router>
  );
};

export default App;