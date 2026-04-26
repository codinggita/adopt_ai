import API from '../utils/axios.js';

// Generate insights (mock)
const generateInsights = async (campaignId = null) => {
  return {
    status: 'success',
    data: {
      _id: Math.random().toString(),
      type: 'general',
      title: 'New AI Insight',
      summary: 'Newly generated AI insight for your campaigns.',
      recommendations: [
        { action: 'Review', priority: 'medium', expectedImpact: '+2% ROAS' }
      ]
    }
  };
};

// Get all insights
const getInsights = async () => {
  // Return mock data matching Figma design instead of backend call
  return {
    status: 'success',
    data: [
      {
        _id: '1',
        type: 'audience',
        title: 'Audience Saturation',
        summary: 'Campaign "Q3 Enterprise SaaS" has reached 85% audience saturation. Frequency is increasing rapidly, leading to diminished returns.',
        recommendations: [
          { action: 'Expand Lookalikes', priority: 'high', expectedImpact: '-22% CPA' }
        ]
      },
      {
        _id: '2',
        type: 'creative',
        title: 'Creative Fatigue',
        summary: "Asset variant 'A-Hero-Dark' shows a 14% decline in engagement over the last 72 hours. Consider rotating in generated alternatives.",
        recommendations: [
          { action: 'Rotate Assets', priority: 'medium', expectedImpact: '+8% CTR' }
        ]
      },
      {
        _id: '3',
        type: 'optimization',
        title: 'Dayparting Shift',
        summary: 'B2B conversions are over-indexing between 14:00 and 16:00 EST. Shifting 10% of budget to this window can improve efficiency.',
        recommendations: [
          { action: 'Apply Schedule', priority: 'low', expectedImpact: '-5% CPC' }
        ]
      }
    ]
  };
};

// Delete/Dismiss an insight (mock)
const deleteInsight = async (insightId) => {
  return { status: 'success', data: null };
};

const aiService = {
  generateInsights,
  getInsights,
  deleteInsight,
};

export default aiService;
