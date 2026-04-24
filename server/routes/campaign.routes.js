import express from 'express';
import { createCampaign, getCampaigns } from '../controllers/campaign.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect); // All campaign routes are protected

router.route('/')
  .post(createCampaign)
  .get(getCampaigns);

export default router;
