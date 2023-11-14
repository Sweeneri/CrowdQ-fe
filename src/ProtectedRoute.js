import React from 'react';
import { Navigate } from 'react-router-dom';

const fakeAuth = {
  isAuthenticated: true, // Set this to false to simulate unauthenticated state
};

const ProtectedRoute = ({ element: Element }) => {
  return fakeAuth.isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default ProtectedRoute;