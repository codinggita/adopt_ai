import Integration from '../models/Integration.js';
import { metaGraphClient } from '../utils/apiClient.js';

/**
 * Fetch campaign metrics from Meta Ads
 * @param {string} userId 
 */
export const fetchMetaMetrics = async (userId) => {
  try {
    const integration = await Integration.findOne({ user: userId, provider: 'meta', status: 'active' });
    
    if (!integration) {
      return null;
    }

    const { accessToken, accountId } = integration;

    // Fetch insights for the ad account
    // Endpoint: /{ad_account_id}/insights?fields=campaign_name,spend,clicks,impressions,inline_link_click_ctr&level=campaign
    const response = await metaGraphClient.get(`/${accountId}/insights`, {
      params: {
        access_token: accessToken,
        fields: 'campaign_name,spend,clicks,impressions,inline_link_click_ctr',
        level: 'campaign',
        date_preset: 'last_30d'
      }
    });

    if (!response.data || !response.data.data) {
      return [];
    }

    return response.data.data.map(item => ({
      platform: 'Meta',
      campaignName: item.campaign_name,
      spend: parseFloat(item.spend) || 0,
      clicks: parseInt(item.clicks) || 0,
      impressions: parseInt(item.impressions) || 0,
      ctr: parseFloat(item.inline_link_click_ctr) || 0,
      status: 'Active' // Meta API doesn't return status in insights by default, would need another call
    }));
  } catch (error) {
    console.error('Error fetching Meta metrics:', error.response?.data || error.message);
    // If it's a 400 error (token expired), we might want to handle it, but for now just throw
    throw error;
  }
};
