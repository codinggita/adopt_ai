import axios from 'axios';

export const googleAdsClient = axios.create({
  baseURL: 'https://googleads.googleapis.com/v15',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const metaGraphClient = axios.create({
  baseURL: 'https://graph.facebook.com/v19.0',
  headers: {
    'Content-Type': 'application/json',
  }
});
