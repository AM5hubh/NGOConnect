import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';

const PrivateRoutes = () => {
  const loggedIn = localStorage.getItem("accesstoken"); // Check if accessToken exists
  const isAdmin = localStorage.getItem("admin") === 'true'; // Check if the user is an admin

  if (loggedIn && isAdmin) {
    return <AdminDashboard />; // Allow access to admin routes
  } else {
    return (<>
    <h1 className='text-center font-bold text-red-500 p-24'>You are not an admin...contact the admin to get verified</h1></>); // Redirect to login if not admin or not logged in
  }
};

export default PrivateRoutes;
