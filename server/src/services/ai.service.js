import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Generate a chat response from Groq AI using llama-3.3-70b-versatile.
 * (llama3-8b-8192 is decommissioned)
 *
 * @param {string} message - The user's message
 * @returns {string} AI text response
 */
export const generateAIResponse = async (message) => {
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful AI assistant for marketing campaigns',
      },
      {
        role: 'user',
        content: message,
      },
    ],
    temperature: 0.7,
    max_tokens: 1024,
  });

  return completion.choices[0].message.content;
};
