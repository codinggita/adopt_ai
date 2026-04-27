import express from 'express';
import { getCampaignMetrics } from '../controllers/data.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/campaign-metrics', protect, getCampaignMetrics);

export default router;
