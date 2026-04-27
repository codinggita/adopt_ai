import axios from 'axios';

const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';

/**
 * Custom Grok API Client using Axios
 */
const grok = {
  chat: {
    completions: {
      create: async (params) => {
        try {
          const response = await axios.post(
            GROK_API_URL,
            {
              model: params.model || 'grok-beta',
              messages: params.messages,
              temperature: params.temperature ?? 0.7,
              max_tokens: params.max_tokens ?? 1024,
              response_format: params.response_format,
            },
            {
              headers: {
                'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          );
          return response.data;
        } catch (error) {
          const errMsg = error.response?.data?.error?.message || error.response?.data?.message || error.message;
          console.error('Grok API Error Details:', JSON.stringify(error.response?.data || {}, null, 2));
          throw new Error(`AI service unavailable: ${errMsg}`);
        }
      },
    },
  },
};

export default grok;
