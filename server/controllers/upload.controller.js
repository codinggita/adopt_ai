import Creative from '../models/Creative.js';

// @desc    Upload file to Cloudinary and save record to DB
// @route   POST /api/upload
// @access  Private
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'No file uploaded',
      });
    }

    const { originalname, path, filename, mimetype } = req.file;

    // Determine resource type
    const resourceType = mimetype.startsWith('video') ? 'video' : 'image';

    const creative = await Creative.create({
      name: req.body.name || originalname,
      url: path,
      publicId: filename,
      resourceType,
      user: req.user._id,
    });

    res.status(201).json({
      status: 'success',
      data: creative,
    });
  } catch (error) {
    console.error('File upload error:', error.message);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Failed to upload file',
    });
  }
};

// @desc    Get all creatives for user
// @route   GET /api/upload
// @access  Private
export const getCreatives = async (req, res) => {
  try {
    const creatives = await Creative.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: creatives.length,
      data: creatives,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
