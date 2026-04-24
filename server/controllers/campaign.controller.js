import Campaign from '../models/Campaign.js';

// @desc    Create a new campaign
// @route   POST /api/campaigns
// @access  Private
export const createCampaign = async (req, res) => {
  try {
    const { name, status, dailyBudget, spend, roas } = req.body;

    const campaign = await Campaign.create({
      name,
      status,
      dailyBudget,
      spend,
      roas,
      user: req.user._id
    });

    res.status(201).json({
      status: 'success',
      data: campaign
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// @desc    Get all campaigns for the logged-in user
// @route   GET /api/campaigns
// @access  Private
export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: campaigns.length,
      data: campaigns
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
