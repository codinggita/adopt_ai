import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Target, Lightbulb, Users, Settings, Plus, Sparkles } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Sparkles className="logo-icon" size={20} />
          <span>ADOPT AI</span>
        </div>
        <div className="sidebar-tagline">PRECISION MARKETING</div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/campaigns" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Target size={18} />
          <span>Campaigns</span>
        </NavLink>
        
        <NavLink to="/insights" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Lightbulb size={18} />
          <span>Insights</span>
        </NavLink>
        
        <NavLink to="/audiences" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Users size={18} />
          <span>Audiences</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/settings" className="sidebar-link settings-link">
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
        <button className="btn-new-campaign" onClick={() => navigate('/campaigns?create=true')}>
          <Plus size={16} />
          <span>New Campaign</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

