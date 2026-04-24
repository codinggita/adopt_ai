import mongoose from 'mongoose';

const insightSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    default: null
  },
  type: {
    type: String,
    enum: ['optimization', 'budget', 'audience', 'creative', 'general'],
    default: 'general'
  },
  title: {
    type: String,
    required: [true, 'Insight title is required'],
    trim: true
  },
  summary: {
    type: String,
    required: [true, 'Insight summary is required']
  },
  recommendations: [{
    action: { type: String, required: true },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    },
    expectedImpact: { type: String }
  }],
  metadata: {
    model: { type: String, default: 'gpt-4o-mini' },
    tokensUsed: { type: Number, default: 0 },
    campaignSnapshot: { type: mongoose.Schema.Types.Mixed }
  }
}, { timestamps: true });

// Index for fast lookups by user + recency
insightSchema.index({ user: 1, createdAt: -1 });

const Insight = mongoose.model('Insight', insightSchema);
export default Insight;
