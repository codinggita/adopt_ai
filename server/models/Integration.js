import mongoose from 'mongoose';

const integrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  provider: {
    type: String,
    enum: ['google', 'meta'],
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String
  },
  expiresAt: {
    type: Date
  },
  accountId: {
    type: String
  },
  accountName: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'disconnected'],
    default: 'active'
  }
}, { timestamps: true });

// Ensure a user can only have one active integration per provider
integrationSchema.index({ user: 1, provider: 1 }, { unique: true });

const Integration = mongoose.model('Integration', integrationSchema);
export default Integration;
