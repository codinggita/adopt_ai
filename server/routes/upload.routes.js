import express from 'express';
import { uploadFile, getCreatives } from '../controllers/upload.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(upload.single('file'), uploadFile)
  .get(getCreatives);

export default router;
