import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CampaignTable = ({ campaigns, onEdit, onDelete }) => {
  const getStatusClass = (status) => {
    if (status === 'Optimized') return 'badge optimized';
    if (status === 'Learning') return 'badge learning';
    return 'badge paused';
  };

  return (
    <div className="campaign-table-container">
      <table className="campaign-table">
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Daily Budget</th>
            <th>Spend</th>
            <th>ROAS</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((camp) => (
            <tr key={camp._id}>
              <td>
                <div className="campaign-name-cell">
                  <Link to={`/campaigns/${camp._id}`} className="camp-title-link">
                    <div className="camp-title">{camp.name}</div>
                  </Link>
                </div>
              </td>
              <td>${camp.dailyBudget?.toLocaleString()}</td>
              <td>${camp.spend?.toLocaleString() || '0'}</td>
              <td className="text-purple">{camp.roas || 0}x</td>
              <td><span className={getStatusClass(camp.status)}>{camp.status}</span></td>
              <td>
                <div className="action-btns">
                  <button className="action-btn edit" onClick={() => onEdit(camp)}>
                    <Edit2 size={15} />
                  </button>
                  <button className="action-btn delete" onClick={() => onDelete(camp._id)}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {campaigns.length === 0 && (
            <tr>
              <td colSpan="6" className="empty-row">
                No campaigns found. Create your first one!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignTable;
