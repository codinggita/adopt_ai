import express from 'express';
import {
  chatHandler,
  generateAIInsights,
  getInsights,
  getInsightById,
  deleteInsight
} from '../controllers/ai.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All AI routes are protected
router.use(protect);

// POST /api/ai/chat — Groq AI chat
router.post('/chat', chatHandler);

// POST /api/ai/generate — generate new AI insights
router.post('/generate', generateAIInsights);

// GET /api/ai/insights — list all insights
router.get('/insights', getInsights);

// GET /api/ai/insights/:id — get single insight
// DELETE /api/ai/insights/:id — delete an insight
router.route('/insights/:id')
  .get(getInsightById)
  .delete(deleteInsight);

export default router;
