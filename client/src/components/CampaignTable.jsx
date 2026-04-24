import React from 'react';

const campaigns = [
  {
    id: 'CAM-9921',
    name: 'Q4 Alpha Retargeting',
    platform: 'Search',
    platformBrand: 'G',
    spend: '$12,450',
    cpa: '$42.10',
    roas: '3.2x',
    status: 'ACTIVE'
  },
  {
    id: 'CAM-8834',
    name: 'Lookalike Expansion V2',
    platform: 'Social',
    platformBrand: 'M',
    spend: '$8,920',
    cpa: '$65.40',
    roas: '1.8x',
    status: 'ACTIVE'
  },
  {
    id: 'CAM-7710',
    name: 'Holiday Promo - Top Funnel',
    platform: 'B2B',
    platformBrand: 'in',
    spend: '$3,200',
    cpa: '$110.00',
    roas: '0.9x',
    status: 'PAUSED'
  },
  {
    id: 'CAM-9102',
    name: 'Dynamic Product DPA',
    platform: 'Social',
    platformBrand: 'M',
    spend: '$21,050',
    cpa: '$28.90',
    roas: '4.5x',
    status: 'ACTIVE'
  }
];

const CampaignTable = () => {
  return (
    <div className="campaign-table-container">
      <table className="campaign-table">
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Platform</th>
            <th>Spend</th>
            <th>CPA</th>
            <th>ROAS</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((camp) => (
            <tr key={camp.id}>
              <td>
                <div className="campaign-name-cell">
                  <div className="camp-title">{camp.name}</div>
                  <div className="camp-id">ID: {camp.id}</div>
                </div>
              </td>
              <td>
                <div className="platform-cell">
                  <span className={`platform-brand ${camp.platformBrand.toLowerCase()}`}>
                    {camp.platformBrand}
                  </span>
                  <span className="platform-name">{camp.platform}</span>
                </div>
              </td>
              <td className="text-white">{camp.spend}</td>
              <td className="text-success">{camp.cpa}</td>
              <td className="text-white">{camp.roas}</td>
              <td>
                <span className={`status-badge ${camp.status.toLowerCase()}`}>
                  {camp.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-pagination">
        <span>Showing 1-4 of 24 campaigns</span>
        <div className="pagination-arrows">
          <button className="arrow-btn" disabled>&lt;</button>
          <button className="arrow-btn">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default CampaignTable;
