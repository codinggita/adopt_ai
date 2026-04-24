import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import CampaignList from '../pages/CampaignList.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      {/* Additional layout-wrapped pages would go here */}
      <Route
        path="/campaigns"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CampaignList />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/insights" element={<ProtectedRoute><DashboardLayout><div style={{padding: '2rem'}}>Insights</div></DashboardLayout></ProtectedRoute>} />
      <Route path="/audiences" element={<ProtectedRoute><DashboardLayout><div style={{padding: '2rem'}}>Audiences</div></DashboardLayout></ProtectedRoute>} />
      
      <Route path="*" element={<div style={{ padding: '4rem', textAlign: 'center' }}>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
