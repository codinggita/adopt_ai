import express from 'express';
import authRoutes from './auth.routes.js';

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

export default router;
