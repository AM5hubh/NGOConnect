import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const loggedIn = localStorage.getItem("accesstoken"); // Check if accessToken exists
  const isAdmin = localStorage.getItem("admin") === 'true'; // Check if the user is an admin

  if (loggedIn && isAdmin) {
    return <Outlet />; // Allow access to admin routes
  } else {
    return <Outlet />; // Redirect to login if not admin or not logged in
  }
};

export default PrivateRoutes;
