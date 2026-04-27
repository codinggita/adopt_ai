import express from 'express';
import authRoutes from './auth.routes.js';
import campaignRoutes from './campaign.routes.js';
import aiRoutes from './ai.routes.js';
import uploadRoutes from './upload.routes.js';
import notificationRoutes from './notification.routes.js';
import audienceRoutes from './audience.routes.js';
import oauthRoutes from './oauth.routes.js';
import dataRoutes from './data.routes.js';

const router = express.Router();

// Health check API
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

router.use('/auth', authRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/ai', aiRoutes);
router.use('/upload', uploadRoutes);
router.use('/notifications', notificationRoutes);
router.use('/audiences', audienceRoutes);
router.use('/oauth', oauthRoutes);
router.use('/data', dataRoutes);

export default router;
