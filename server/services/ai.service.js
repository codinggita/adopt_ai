import grok from '../utils/grok.js';

/**
 * Build a system prompt that instructs GPT to act as an ad-campaign
 * optimization expert and return structured JSON.
 */
const SYSTEM_PROMPT = `You are an expert digital advertising strategist for the AdOpt AI platform.
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
- If ROAS < 1, flag it as high-priority concern
- If spend exceeds daily budget, flag overspend
- If status is "Learning", suggest patience or small tweaks only`;

/**
 * Generates AI insights for the given campaign data.
 *
 * @param {Array} campaigns - Array of campaign documents from MongoDB
 * @returns {{ insight: object, tokensUsed: number, model: string }}
 */
export const generateInsights = async (campaigns) => {
  const campaignSummary = campaigns.map((c) => ({
    name: c.name,
    status: c.status,
    dailyBudget: c.dailyBudget,
    spend: c.spend,
    roas: c.roas,
  }));

  const userMessage = `Here is my current campaign portfolio:\n${JSON.stringify(campaignSummary, null, 2)}\n\nAnalyze this data and provide optimization insights.`;

  const model = 'grok-beta';

  const completion = await grok.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.7,
    max_tokens: 1024,
    response_format: { type: 'json_object' },
  });

  const choice = completion.choices[0];
  const tokensUsed = completion.usage?.total_tokens || 0;
  const parsed = JSON.parse(choice.message.content);

  return {
    insight: parsed,
    tokensUsed,
    model,
  };
};
