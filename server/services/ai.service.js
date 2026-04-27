import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = 'llama-3.3-70b-versatile';

/**
 * Generate a chat response from Groq AI.
 *
 * @param {string} message - The user's message
 * @returns {string} AI text response
 */
export const generateAIResponse = async (message) => {
  const completion = await groq.chat.completions.create({
    model: MODEL,
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

/**
 * System prompt for structured campaign insight generation.
 */
const INSIGHTS_SYSTEM_PROMPT = `You are an expert digital advertising strategist for the AdOpt AI platform.
Analyze the provided campaign data and return actionable insights as valid JSON.

Return EXACTLY this JSON structure (no markdown, no code fences):
{
  "title": "Brief insight headline (max 12 words)",
  "type": "one of: optimization | budget | audience | creative | general",
  "summary": "2-3 sentence analysis of the campaign data",
  "recommendations": [
    {
      "action": "Specific actionable recommendation",
      "priority": "high | medium | low",
      "expectedImpact": "What improvement to expect"
    }
  ]
}

Rules:
- Provide 2-5 recommendations per analysis
- Base priority on potential ROI impact
- Be specific — reference actual numbers from the data
- If CTR < 1%, flag it as high-priority concern
- If spend is high with low clicks, flag inefficiency`;

/**
 * Generate structured AI insights for campaign data.
 *
 * @param {Array} campaigns - Array of campaign metric objects
 * @returns {{ insight: object, tokensUsed: number, model: string }}
 */
export const generateInsights = async (campaigns) => {
  const campaignSummary = campaigns.map((c) => ({
    name: c.campaignName,
    platform: c.platform,
    spend: c.spend,
    clicks: c.clicks,
    impressions: c.impressions,
    ctr: c.ctr,
    status: c.status,
  }));

  const userMessage = `Here is my real-time campaign performance data from multiple platforms:\n${JSON.stringify(campaignSummary, null, 2)}\n\nAnalyze this data and provide 3-5 specific optimization insights. Reference actual numbers.`;

  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: INSIGHTS_SYSTEM_PROMPT },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.7,
    max_tokens: 1024,
  });

  const choice = completion.choices[0];
  const tokensUsed = completion.usage?.total_tokens || 0;

  // Clean up content in case of markdown fences
  let content = choice.message.content;
  if (content.includes('```')) {
    content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '');
  }
  content = content.trim();

  const parsed = JSON.parse(content);

  return {
    insight: parsed,
    tokensUsed,
    model: MODEL,
  };
};
