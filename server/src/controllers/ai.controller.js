import { generateAIResponse } from '../services/ai.service.js';

/**
 * Handle AI chat requests.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const chatHandler = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate: message exists
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required',
      });
    }

    // Call service
    const result = await generateAIResponse(message);

    // Return AI response
    res.status(200).json({
      success: true,
      reply: result,
    });
  } catch (error) {
    console.error('Groq Chat Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to generate AI response',
    });
  }
};
