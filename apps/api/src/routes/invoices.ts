import { Router } from 'express';
import { ApiResponse, InvoiceDocument } from '@pdf-dashboard/types';
import { InvoiceModel } from '../models/Invoice';
import { createError } from '../middleware/errorHandler';

const router = Router();

// GET /api/invoices
router.get('/', async (req, res, next) => {
  try {
    const { q } = req.query;
    const searchQuery = q ? { $text: { $search: q as string } } : {};
    
    const invoices = await InvoiceModel.find(searchQuery)
      .sort({ createdAt: -1 })
      .limit(50);

    const response: ApiResponse<InvoiceDocument[]> = {
      success: true,
      data: invoices,
      message: 'Invoices retrieved successfully'
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET /api/invoices/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const invoice = await InvoiceModel.findById(id);
    
    if (!invoice) {
      throw createError('Invoice not found', 404);
    }

    const response: ApiResponse<InvoiceDocument> = {
      success: true,
      data: invoice,
      message: 'Invoice retrieved successfully'
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// PUT /api/invoices/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const invoice = await InvoiceModel.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date().toISOString() },
      { new: true, runValidators: true }
    );

    if (!invoice) {
      throw createError('Invoice not found', 404);
    }

    const response: ApiResponse<InvoiceDocument> = {
      success: true,
      data: invoice,
      message: 'Invoice updated successfully'
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/invoices/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const invoice = await InvoiceModel.findByIdAndDelete(id);
    
    if (!invoice) {
      throw createError('Invoice not found', 404);
    }

    const response: ApiResponse<null> = {
      success: true,
      data: null,
      message: 'Invoice deleted successfully'
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export { router as invoiceRoutes };
