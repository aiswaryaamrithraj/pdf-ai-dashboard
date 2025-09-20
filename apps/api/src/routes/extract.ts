import { Router } from 'express';
import { ApiResponse, ExtractRequest, InvoiceDocument, AIModel } from '@pdf-dashboard/types';
import { createError } from '../middleware/errorHandler';
import { extractWithGemini } from '../services/geminiService';
import { extractWithGroq } from '../services/groqService';

const router = Router();

// POST /api/extract
router.post('/', async (req, res, next) => {
  try {
    const { fileId, model }: ExtractRequest = req.body;

    if (!fileId || !model) {
      throw createError('fileId and model are required', 400);
    }

    if (!['gemini', 'groq'].includes(model)) {
      throw createError('Model must be either "gemini" or "groq"', 400);
    }

    // In a real application, you would retrieve the PDF file from storage
    // For now, we'll simulate the extraction with mock data
    let extractedData: InvoiceDocument;

    if (model === 'gemini') {
      extractedData = await extractWithGemini(fileId);
    } else {
      extractedData = await extractWithGroq(fileId);
    }

    const response: ApiResponse<InvoiceDocument> = {
      success: true,
      data: extractedData,
      message: 'Data extracted successfully'
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export { router as extractRoutes };
