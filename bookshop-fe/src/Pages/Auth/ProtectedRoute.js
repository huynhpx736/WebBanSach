import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from './AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('user'));

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
