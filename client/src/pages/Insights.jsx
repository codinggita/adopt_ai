import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInsights, generateInsights, dismissInsight, applyInsightLocal } from '../features/ai/aiSlice.js';
import InsightList from '../components/InsightList.jsx';
import { Sparkles, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import './insights.css';

const Insights = () => {
  const dispatch = useDispatch();
  const { insights, isLoading, isError, message } = useSelector((state) => state.ai);

  useEffect(() => {
    dispatch(getInsights());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleApply = (insight) => {
    // Optimistic local update
    dispatch(applyInsightLocal(insight._id));
    toast.success('Optimization applied successfully!');
  };

  const handleDismiss = (id) => {
    dispatch(dismissInsight(id));
    toast.success('Insight dismissed');
  };

  const handleGenerate = () => {
    dispatch(generateInsights());
    toast.success('Generating new insights...');
  };

  return (
    <div className="page-container p-6">
      <div className="intelligence-hub-header">
        <div className="flex justify-between items-center mb-2">
          <h1 className="intelligence-hub-title">
            <Sparkles size={28} />
            Intelligence Hub
          </h1>
          <button 
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex items-center gap-2 bg-primary-purple hover:bg-primary-purple-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Scan Campaigns
          </button>
        </div>
        <p className="intelligence-hub-subtitle">
          Review and apply AI-driven optimizations for active campaigns.
        </p>
      </div>

      <InsightList 
        insights={insights} 
        isLoading={isLoading} 
        onApply={handleApply}
        onDismiss={handleDismiss}
      />
    </div>
  );
};

export default Insights;
