import express from 'express';
import { createCampaign, getCampaigns, updateCampaign, deleteCampaign } from '../controllers/campaign.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createCampaign)
  .get(getCampaigns);

router.route('/:id')
  .put(updateCampaign)
  .delete(deleteCampaign);

export default router;
