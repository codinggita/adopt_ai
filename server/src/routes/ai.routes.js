import express from 'express';
import { chatHandler } from '../controllers/ai.controller.js';

const router = express.Router();

/**
 * @route   POST /api/ai/chat
 * @desc    Send a message to the AI and get a response
 * @access  Public (or as configured)
 */
router.post('/chat', chatHandler);

export default router;
