import API from '../utils/axios';

const getGoogleUrl = async () => {
  const response = await API.get('/oauth/google/url');
  return response.data.url;
};

const getMetaUrl = async () => {
  const response = await API.get('/oauth/meta/url');
  return response.data.url;
};

const getConnectionStatus = async () => {
  const response = await API.get('/oauth/status');
  return response.data;
};

const oauthService = {
  getGoogleUrl,
  getMetaUrl,
  getConnectionStatus,
};

export default oauthService;
