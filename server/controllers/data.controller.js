import { fetchGoogleMetrics } from '../services/googleAds.service.js';
import { fetchMetaMetrics } from '../services/metaAds.service.js';

export const getCampaignMetrics = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch data from both platforms in parallel
    const [googleData, metaData] = await Promise.all([
      fetchGoogleMetrics(userId),
      fetchMetaMetrics(userId)
    ]);

    // Merge data
    const combinedData = [];
    if (googleData) combinedData.push(...googleData);
    if (metaData) combinedData.push(...metaData);

    res.status(200).json({
      status: 'success',
      data: combinedData
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
