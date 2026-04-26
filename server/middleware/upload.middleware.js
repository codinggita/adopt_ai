import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'adopt_ai_creatives',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'mp4'],
    resource_type: 'auto', // Important for supporting both images and videos
  },
});

const upload = multer({ storage: storage });

export default upload;
