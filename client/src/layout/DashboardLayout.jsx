import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const isCampaignPage = location.pathname.startsWith('/campaigns');

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main-wrapper">
        {!isCampaignPage && <Navbar />}
        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
