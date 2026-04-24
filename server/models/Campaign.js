import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Campaign name is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['Learning', 'Optimized', 'Paused'],
    default: 'Learning'
  },
  dailyBudget: {
    type: Number,
    required: [true, 'Daily budget is required'],
    min: [0, 'Daily budget cannot be negative']
  },
  spend: {
    type: Number,
    default: 0
  },
  roas: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
