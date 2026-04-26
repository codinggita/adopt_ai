import React from 'react';
import { Target, Sparkles, Clock, TrendingDown, TrendingUp, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

const getPriorityDetails = (priority, type) => {
  if (priority === 'high') {
    return { className: 'badge-high', label: 'High Priority', icon: <AlertTriangle size={12} /> };
  }
  if (priority === 'medium') {
    return { className: 'badge-medium', label: 'Medium', icon: <Info size={12} /> };
  }
  return { className: 'badge-low', label: 'Optimization', icon: <CheckCircle2 size={12} /> };
};

const getTypeIcon = (type) => {
  switch (type) {
    case 'audience': return <Target size={20} className="insight-type-icon" />;
    case 'creative': return <Sparkles size={20} className="insight-type-icon" />;
    case 'budget':
    case 'optimization': return <Clock size={20} className="insight-type-icon" />;
    default: return <Sparkles size={20} className="insight-type-icon" />;
  }
};

const InsightCard = ({ insight, onApply, onDismiss }) => {
  // Use the first recommendation for the primary action button and impact
  const primaryRec = insight.recommendations && insight.recommendations.length > 0 
    ? insight.recommendations[0] 
    : { action: 'Apply Optimization', priority: 'medium', expectedImpact: '+5% Performance' };

  const priorityDetails = getPriorityDetails(primaryRec.priority, insight.type);
  
  // Try to parse impact string to see if it's positive or negative for the icon
  // e.g., "-22% CPA" (good) or "+8% CTR" (good)
  const impactStr = primaryRec.expectedImpact || '';
  const isCPA = impactStr.includes('CPA') || impactStr.includes('CPC');
  const isPositiveMetric = impactStr.includes('+');
  const isNegativeMetric = impactStr.includes('-');
  
  // For CPA/CPC, decrease is good. For CTR/ROAS, increase is good.
  const TrendIcon = (isCPA && isNegativeMetric) || (!isCPA && isPositiveMetric) ? TrendingUp : TrendingDown;
  // Always use green for good impact in this UI context based on Figma
  const trendClass = 'text-success-green';

  return (
    <div className="insight-card">
      <div className="insight-card-header">
        <div className="insight-title-group">
          {getTypeIcon(insight.type)}
          <h3 className="insight-title">{insight.title}</h3>
        </div>
        <div className={`insight-badge ${priorityDetails.className}`}>
          {priorityDetails.icon}
          <span>{priorityDetails.label}</span>
        </div>
      </div>
      
      <div className="insight-card-body">
        <p className="insight-description">{insight.summary}</p>
        
        <div className="insight-impact-box">
          <span className="impact-label">Expected Impact</span>
          <div className={`impact-value ${trendClass}`}>
            <TrendIcon size={14} />
            <span className="impact-text">{impactStr || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="insight-card-actions">
        <button className="btn-insight-primary" onClick={() => onApply(insight)}>
          {primaryRec.action}
        </button>
        <button className="btn-insight-secondary" onClick={() => onDismiss(insight._id)}>
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default InsightCard;
