import { 
  getGoogleAuthUrl, 
  getMetaAuthUrl, 
  exchangeGoogleCode, 
  exchangeMetaCode 
} from '../services/oauth.service.js';
import Integration from '../models/Integration.js';
import { verifyToken } from '../utils/jwt.js';

// @desc    Get Google Auth URL
// @route   GET /api/oauth/google/url
// @access  Private
export const getGoogleUrl = (req, res) => {
  try {
    // Generate URL and attach user ID in state (or handle via frontend state)
    // For simplicity, we'll return the URL and the frontend can handle the redirect
    const url = getGoogleAuthUrl();
    res.json({ url: `${url}&state=${req.headers.authorization.split(' ')[1]}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Meta Auth URL
// @route   GET /api/oauth/meta/url
// @access  Private
export const getMetaUrl = (req, res) => {
  try {
    const url = getMetaAuthUrl();
    res.json({ url: `${url}&state=${req.headers.authorization.split(' ')[1]}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Google Callback
// @route   GET /api/oauth/google/callback
// @access  Public (Token verified from state)
export const googleCallback = async (req, res) => {
  const { code, state } = req.query;
  
  try {
    if (!code || !state) throw new Error('Invalid response from provider');

    // Verify user from state token
    const decoded = verifyToken(state);
    const userId = decoded.id;

    // Exchange code for tokens
    const tokens = await exchangeGoogleCode(code);

    // Save or update integration
    await Integration.findOneAndUpdate(
      { user: userId, provider: 'google' },
      {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
        status: 'active'
      },
      { upsert: true, new: true }
    );

    // Redirect back to frontend success page
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/settings/connect?success=google`);
  } catch (error) {
    console.error('Google OAuth Error:', error);
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/settings/connect?error=google`);
  }
};

// @desc    Meta Callback
// @route   GET /api/oauth/meta/callback
// @access  Public
export const metaCallback = async (req, res) => {
  const { code, state } = req.query;

  try {
    if (!code || !state) throw new Error('Invalid response from provider');

    const decoded = verifyToken(state);
    const userId = decoded.id;

    const tokens = await exchangeMetaCode(code);

    await Integration.findOneAndUpdate(
      { user: userId, provider: 'meta' },
      {
        accessToken: tokens.access_token,
        // Meta sometimes doesn't give refresh tokens unless requested
        expiresAt: tokens.expires_in ? new Date(Date.now() + tokens.expires_in * 1000) : null,
        status: 'active'
      },
      { upsert: true, new: true }
    );

    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/settings/connect?success=meta`);
  } catch (error) {
    console.error('Meta OAuth Error:', error);
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/settings/connect?error=meta`);
  }
};

// @desc    Get Connection Status
// @route   GET /api/oauth/status
// @access  Private
export const getConnectionStatus = async (req, res) => {
  try {
    const integrations = await Integration.find({ user: req.user._id }).select('provider status updatedAt');
    res.json(integrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
