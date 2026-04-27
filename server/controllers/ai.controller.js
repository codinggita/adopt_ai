import Campaign from '../models/Campaign.js';
import Insight from '../models/Insight.js';
import { generateAIResponse, generateInsights } from '../services/ai.service.js';
import { fetchGoogleMetrics } from '../services/googleAds.service.js';
import { fetchMetaMetrics } from '../services/metaAds.service.js';

// @desc    AI Chat — send a message, get a reply
// @route   POST /api/ai/chat
// @access  Private
export const chatHandler = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required',
      });
    }

    const reply = await generateAIResponse(message);

    res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error('AI Chat Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to generate AI response',
    });
  }
};

// @desc    Generate AI insights from real-time campaign data
// @route   POST /api/ai/generate
// @access  Private
export const generateAIInsights = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch real-time data from both platforms + manual campaigns
    const [googleData, metaData, manualCampaigns] = await Promise.all([
      fetchGoogleMetrics(userId),
      fetchMetaMetrics(userId),
      Campaign.find({ user: userId })
    ]);

    const campaigns = [];
    if (googleData) campaigns.push(...googleData);
    if (metaData) campaigns.push(...metaData);

    // Add manual campaigns from DB
    if (manualCampaigns && manualCampaigns.length > 0) {
      manualCampaigns.forEach(c => {
        campaigns.push({
          campaignName: c.name,
          platform: 'Manual',
          spend: c.spend || 0,
          clicks: Math.floor((c.spend || 0) / 1.5),
          impressions: Math.floor((c.spend || 0) * 50),
          ctr: 1.2,
          status: c.status
        });
      });
    }

    // Fallback sample data for demo
    if (campaigns.length === 0) {
      campaigns.push(
        { campaignName: 'Sample Search Campaign', platform: 'Google', spend: 250, clicks: 120, impressions: 4500, ctr: 2.6, status: 'Enabled' },
        { campaignName: 'Sample Social Campaign', platform: 'Meta', spend: 180, clicks: 95, impressions: 8000, ctr: 1.1, status: 'Active' }
      );
    }

    // Call Groq through the service layer
    const { insight, tokensUsed, model } = await generateInsights(campaigns);

    // Persist the insight
    const saved = await Insight.create({
      user: userId,
      type: insight.type || 'general',
      title: insight.title,
      summary: insight.summary,
      recommendations: insight.recommendations,
      metadata: {
        model,
        tokensUsed,
        campaignSnapshot: campaigns,
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
