import API from '../utils/axios.js';

// Generate insights
const generateInsights = async (campaignId = null) => {
  const body = campaignId ? { campaignId } : {};
  const response = await API.post('/ai/generate', body);
  return response.data;
};

// Get all insights
const getInsights = async () => {
  const response = await API.get('/ai/insights');
  return response.data;
};

// Delete/Dismiss an insight
const deleteInsight = async (insightId) => {
  const response = await API.delete(`/ai/insights/${insightId}`);
  return response.data;
};

const aiService = {
  generateInsights,
  getInsights,
  deleteInsight,
};

export default aiService;
