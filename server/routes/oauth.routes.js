import express from 'express';
import { 
  getGoogleUrl, 
  getMetaUrl, 
  googleCallback, 
  metaCallback,
  getConnectionStatus
} from '../controllers/oauth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Callback routes (Public, verification via state)
router.get('/google/callback', googleCallback);
router.get('/meta/callback', metaCallback);

// Protected routes
router.get('/google/url', protect, getGoogleUrl);
router.get('/meta/url', protect, getMetaUrl);
router.get('/status', protect, getConnectionStatus);

export default router;
