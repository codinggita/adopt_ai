import React from 'react';
import InsightCard from './InsightCard.jsx';
import { Sparkles } from 'lucide-react';

const InsightList = ({ insights, onApply, onDismiss, isLoading }) => {
  if (isLoading) {
    return (
      <div className="insights-loading">
        <Sparkles className="animate-spin text-primary-purple" size={32} />
        <p>Analyzing intelligence data...</p>
      </div>
    );
  }

  if (!insights || insights.length === 0) {
    return (
      <div className="insights-empty">
        <Sparkles size={48} className="text-text-muted mb-4" />
        <h3>No active insights</h3>
        <p>Your campaigns are running optimally. Check back later for new AI-driven suggestions.</p>
      </div>
    );
  }

  return (
    <div className="insights-grid">
      {insights.map((insight) => (
        <InsightCard 
          key={insight._id || insight.id || Math.random().toString()} 
          insight={insight} 
          onApply={onApply}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

export default InsightList;
