import React from 'react';
import { Wallet, Eye, MousePointerClick, Activity, CheckCircle2 } from 'lucide-react';
import KpiCard from './KpiCard';

const KpiGrid = ({ totals, avgCtr }) => {
  const kpiData = [
    {
      id: 1,
      title: 'Total Spend',
      icon: Wallet,
      value: totals ? `$${totals.spend.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : '$0',
      trend: { type: 'positive', value: 'Live' }
    },
    {
      id: 2,
      title: 'Impressions',
      icon: Eye,
      value: totals ? (totals.impressions > 1000000 ? `${(totals.impressions / 1000000).toFixed(1)}M` : totals.impressions.toLocaleString()) : '0',
      trend: { type: 'positive', value: 'Live' }
    },
    {
      id: 3,
      title: 'Clicks',
      icon: MousePointerClick,
      value: totals ? (totals.clicks > 1000 ? `${(totals.clicks / 1000).toFixed(1)}K` : totals.clicks.toLocaleString()) : '0',
      trend: { type: 'positive', value: 'Live' }
    },
    {
      id: 4,
      title: 'Avg. CTR',
      icon: Activity,
      value: `${avgCtr}%`,
      trend: { type: 'positive', value: 'Live' },
      isHighlight: true
    }
  ];

  return (
    <div className="kpi-grid">
      {kpiData.map((kpi) => (
        <KpiCard
          key={kpi.id}
          title={kpi.title}
          icon={kpi.icon}
          labelIcon={kpi.labelIcon}
          value={kpi.value}
          trend={kpi.trend}
          isHighlight={kpi.isHighlight}
        />
      ))}
    </div>
  );
};

export default KpiGrid;
