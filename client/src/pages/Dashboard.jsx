import React, { useEffect } from 'react';
import { Calendar, MoreHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlatformData } from '../features/campaign/campaignSlice';
import KpiGrid from '../components/KpiGrid';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { platformData, platformLoading } = useSelector((state) => state.campaign);

  useEffect(() => {
    dispatch(fetchPlatformData());
  }, [dispatch]);

  // Calculate aggregate KPIs
  const totals = platformData.reduce((acc, curr) => {
    acc.spend += curr.spend;
    acc.clicks += curr.clicks;
    acc.impressions += curr.impressions;
    return acc;
  }, { spend: 0, clicks: 0, impressions: 0 });

  const avgCtr = platformData.length > 0 
    ? (platformData.reduce((acc, curr) => acc + curr.ctr, 0) / platformData.length).toFixed(2)
    : 0;

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Overview</h1>
          <p className="dashboard-subtitle">Real-time performance metrics and live platform data.</p>
        </div>
        <button className="date-picker-btn">
          Last 30 Days <Calendar size={14} />
        </button>
      </div>

      {/* KPI Grid */}
      <KpiGrid totals={totals} avgCtr={avgCtr} />

      {/* Charts Row */}
      <div className="charts-row">
        <div className="chart-container flex-2">
          <div className="chart-header">
            <h3>Spend & Efficiency Over Time</h3>
            <MoreHorizontal size={16} className="text-muted" />
          </div>
          <div className="chart-content">
            <LineChart />
          </div>
        </div>

        <div className="chart-container flex-1">
          <div className="chart-header">
            <h3>Click-Through Rate (CTR) by Audience</h3>
            <MoreHorizontal size={16} className="text-muted" />
          </div>
          <div className="chart-content">
            <BarChart />
          </div>
        </div>
      </div>

      {/* Table Row */}
      <div className="table-container">
        <div className="table-header-box">
          <h3>Active Campaigns (Real-time)</h3>
          <button className="btn-outline-sm">View All</button>
        </div>
        {platformLoading ? (
          <div className="loading-state">Loading real-time data...</div>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>CAMPAIGN NAME</th>
                <th>PLATFORM</th>
                <th>STATUS</th>
                <th>SPEND</th>
                <th>CLICKS</th>
                <th>CTR</th>
              </tr>
            </thead>
            <tbody>
              {platformData.length > 0 ? (
                platformData.map((campaign, index) => (
                  <tr key={index}>
                    <td>
                      <div className="campaign-name">
                        <span className={`status-dot ${campaign.platform === 'Google' ? 'blue' : 'purple'}`}></span>
                        {campaign.campaignName}
                      </div>
                    </td>
                    <td><span className={`badge ${campaign.platform.toLowerCase()}`}>{campaign.platform}</span></td>
                    <td><span className="badge optimized">{campaign.status}</span></td>
                    <td>${campaign.spend.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td>{campaign.clicks.toLocaleString()}</td>
                    <td className="text-green">{campaign.ctr}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    No active campaign data found. Connect your accounts to see metrics.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
