import { Router } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse, UploadResponse } from '@pdf-dashboard/types';
import { createError } from '../middleware/errorHandler';

const router = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// POST /api/upload
router.post('/', upload.single('pdf'), async (req, res, next) => {
  try {
    if (!req.file) {
      throw createError('No PDF file uploaded', 400);
    }

    const fileId = uuidv4();
    const fileName = req.file.originalname;

    // In a real application, you would save the file to a storage service
    // like AWS S3, Google Cloud Storage, or Vercel Blob
    // For now, we'll just return the file info
    
    const response: ApiResponse<UploadResponse> = {
      success: true,
      data: {
        fileId,
        fileName
      },
      message: 'PDF uploaded successfully'
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export { router as uploadRoutes };
