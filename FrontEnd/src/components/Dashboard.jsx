// src/components/Dashboard.js
import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <Navbar />
      <h2>Welcome to the Dashboard</h2>
      <Outlet />
    </div>
  );
}

export default Dashboard;
