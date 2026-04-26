import express from 'express';
import authRoutes from './auth.routes.js';
import campaignRoutes from './campaign.routes.js';
import aiRoutes from './ai.routes.js';
import uploadRoutes from './upload.routes.js';

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

export default router;
