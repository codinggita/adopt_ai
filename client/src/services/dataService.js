import axios from 'axios';

const API_URL = '/api/data';

const getCampaignMetrics = async () => {
  const response = await axios.get(`${API_URL}/campaign-metrics`);
  return response.data;
};

const dataService = {
  getCampaignMetrics
};

export default dataService;
