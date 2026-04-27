import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInsights, dismissInsight, applyInsightLocal, generateInsights } from '../features/ai/aiSlice.js';
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
    toast.promise(
      dispatch(generateInsights()).unwrap(),
      {
        loading: 'Analyzing campaign data...',
        success: 'New insights generated!',
        error: (err) => `Failed: ${err}`
      }
    );
  };

  return (
    <div className="page-container p-6">
      <div className="intelligence-hub-header">
        <div>
          <h1 className="intelligence-hub-title">
            <Sparkles size={28} />
            Intelligence Hub
          </h1>
          <p className="intelligence-hub-subtitle">
            Review and apply AI-driven optimizations for active campaigns.
          </p>
        </div>
        <button 
          className="btn-primary flex items-center gap-2" 
          onClick={handleGenerate}
          disabled={isLoading}
        >
          <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
          Generate New Insights
        </button>
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
