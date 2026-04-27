import axios from 'axios';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const META_CLIENT_ID = process.env.META_CLIENT_ID;
const META_CLIENT_SECRET = process.env.META_CLIENT_SECRET;
const REDIRECT_URI_BASE = process.env.REDIRECT_URI_BASE || 'http://localhost:5000/api/oauth';

export const getGoogleAuthUrl = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: `${REDIRECT_URI_BASE}/google/callback`,
    client_id: GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/adwords',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
};

export const getMetaAuthUrl = () => {
  const rootUrl = 'https://www.facebook.com/v19.0/dialog/oauth';
  const options = {
    client_id: META_CLIENT_ID,
    redirect_uri: `${REDIRECT_URI_BASE}/meta/callback`,
    scope: ['ads_management', 'ads_read', 'public_profile', 'email'].join(','),
    response_type: 'code',
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
};

export const exchangeGoogleCode = async (code) => {
  const url = 'https://oauth2.googleapis.com/token';
  const values = {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: `${REDIRECT_URI_BASE}/google/callback`,
    grant_type: 'authorization_code',
  };

  const response = await axios.post(url, new URLSearchParams(values), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return response.data;
};

export const exchangeMetaCode = async (code) => {
  const url = 'https://graph.facebook.com/v19.0/oauth/access_token';
  const params = {
    client_id: META_CLIENT_ID,
    client_secret: META_CLIENT_SECRET,
    redirect_uri: `${REDIRECT_URI_BASE}/meta/callback`,
    code,
  };

  const response = await axios.get(url, { params });
  return response.data;
};
