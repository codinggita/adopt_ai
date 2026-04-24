import Campaign from '../models/Campaign.js';
import Insight from '../models/Insight.js';
import { generateInsights } from '../services/ai.service.js';

// @desc    Generate AI insights from the user's campaign data
// @route   POST /api/ai/generate
// @access  Private
export const generateAIInsights = async (req, res) => {
  try {
    // Optional: scope to a single campaign via body
    const { campaignId } = req.body;

    const query = { user: req.user._id };
    if (campaignId) query._id = campaignId;

    const campaigns = await Campaign.find(query);

    if (campaigns.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No campaigns found. Create campaigns before generating insights.',
      });
    }

    // Call OpenAI through the service layer
    const { insight, tokensUsed, model } = await generateInsights(campaigns);

    // Persist the insight
    const saved = await Insight.create({
      user: req.user._id,
      campaign: campaignId || null,
      type: insight.type || 'general',
      title: insight.title,
      summary: insight.summary,
      recommendations: insight.recommendations,
      metadata: {
        model,
        tokensUsed,
        campaignSnapshot: campaigns.map((c) => ({
          name: c.name,
          status: c.status,
          dailyBudget: c.dailyBudget,
          spend: c.spend,
          roas: c.roas,
        })),
      },
    });

    res.status(201).json({
      status: 'success',
      data: saved,
    });
  } catch (error) {
    console.error('AI Insight generation error:', error.message);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Failed to generate AI insights',
    });
  }
};

// @desc    Get all insights for the logged-in user
// @route   GET /api/ai/insights
// @access  Private
export const getInsights = async (req, res) => {
  try {
    const insights = await Insight.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('campaign', 'name status');

    res.status(200).json({
      status: 'success',
      results: insights.length,
      data: insights,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// @desc    Get a single insight by ID
// @route   GET /api/ai/insights/:id
// @access  Private
export const getInsightById = async (req, res) => {
  try {
    const insight = await Insight.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('campaign', 'name status dailyBudget spend roas');

    if (!insight) {
      return res.status(404).json({ message: 'Insight not found' });
    }

    res.status(200).json({
      status: 'success',
      data: insight,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// @desc    Delete an insight
// @route   DELETE /api/ai/insights/:id
// @access  Private
export const deleteInsight = async (req, res) => {
  try {
    const insight = await Insight.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!insight) {
      return res.status(404).json({ message: 'Insight not found' });
    }

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
