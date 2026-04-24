import React from 'react';
import { Search, Filter, ChevronDown, Bell, User as UserIcon, Plus } from 'lucide-react';
import CampaignTable from '../components/CampaignTable';

const CampaignList = () => {
  return (
    <div className="campaign-list-page">
      {/* Top Search Bar (matches Figma) */}
      <div className="top-search-nav">
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search campaigns..." className="search-input" />
        </div>
        <div className="nav-actions">
          <button className="nav-icon-btn"><Bell size={20} /></button>
          <button className="nav-icon-btn"><UserIcon size={20} /></button>
        </div>
      </div>

      <div className="campaign-list-header">
        <div>
          <h1 className="page-title">Campaigns</h1>
          <p className="page-subtitle">Manage and optimize active deployments.</p>
        </div>
        <div className="header-filters">
          <div className="filter-dropdown">
            All Platforms <ChevronDown size={14} />
          </div>
          <div className="filter-dropdown">
            Active Only <ChevronDown size={14} />
          </div>
          <button className="filter-icon-btn">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="campaign-list-content">
        <div className="main-table-section">
          <CampaignTable />
        </div>
        
        {/* Right Detail Sidebar (Simplified from Figma) */}
        <div className="campaign-detail-sidebar">
          <div className="detail-header">
            <div className="selected-tag">SELECTED</div>
            <h2 className="detail-title">Q4 Alpha Retargeting</h2>
            <p className="detail-subtitle">Google Ads • Search Network</p>
          </div>

          <div className="health-score-card">
            <div className="health-left">
              <div className="health-label">AI HEALTH SCORE</div>
              <p className="health-desc">Performing above baseline</p>
            </div>
            <div className="health-value">
              <span className="score">94</span>
              <span className="total">/100</span>
            </div>
          </div>

          <div className="metric-mini-grid">
            <div className="metric-box">
              <span className="label">Daily Spend</span>
              <span className="value">$1,245.00</span>
            </div>
            <div className="metric-box">
              <span className="label">Target CPA</span>
              <span className="value">$45.00</span>
            </div>
            <div className="metric-box">
              <span className="label">Conversions</span>
              <span className="value text-success">294</span>
            </div>
            <div className="metric-box">
              <span className="label">ROAS</span>
              <span className="value">3.2x</span>
            </div>
          </div>

          <div className="recommendation-card">
            <div className="rec-title">
              <Plus size={14} /> Bid Adjustment Recommended
            </div>
            <p className="rec-text">
              Increase bids by 15% on mobile devices during evening hours to capture high-intent traffic.
            </p>
          </div>

          <div className="detail-footer-btns">
            <button className="btn-secondary-sm">Edit Settings</button>
            <button className="btn-primary-sm">Apply Optimization</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignList;
