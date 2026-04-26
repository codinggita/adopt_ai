import mongoose from 'mongoose';

const creativeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Creative name is required'],
    trim: true,
  },
  url: {
    type: String,
    required: [true, 'File URL is required'],
  },
  publicId: {
    type: String,
    required: [true, 'Cloudinary public ID is required'],
  },
  resourceType: {
    type: String, // image or video
    enum: ['image', 'video'],
    default: 'image',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Creative = mongoose.model('Creative', creativeSchema);
export default Creative;
