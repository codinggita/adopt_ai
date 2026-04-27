import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Target, Lightbulb, Users, Settings, Plus, Sparkles, Link as LinkIcon, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

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

        <NavLink to="/settings/connect" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <LinkIcon size={18} />
          <span>Connect Accounts</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/settings" className="sidebar-link settings-link">
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
        <button className="sidebar-link logout-btn" onClick={handleLogout} style={{ width: '100%', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
        <button className="btn-new-campaign" onClick={() => navigate('/campaigns?create=true')}>
          <Plus size={16} />
          <span>New Campaign</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
