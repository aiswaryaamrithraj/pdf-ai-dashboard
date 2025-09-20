import mongoose, { Schema, Document } from 'mongoose';
import { InvoiceDocument, LineItem, Vendor, Invoice } from '@pdf-dashboard/types';

const LineItemSchema = new Schema<LineItem>({
  description: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true }
});

const VendorSchema = new Schema<Vendor>({
  name: { type: String, required: true },
  address: { type: String },
  taxId: { type: String }
});

const InvoiceSchema = new Schema<Invoice>({
  number: { type: String, required: true },
  date: { type: String, required: true },
  currency: { type: String },
  subtotal: { type: Number },
  taxPercent: { type: Number },
  total: { type: Number },
  poNumber: { type: String },
  poDate: { type: String },
  lineItems: [LineItemSchema]
});

const InvoiceDocumentSchema = new Schema<InvoiceDocument>({
  fileId: { type: String, required: true, unique: true },
  fileName: { type: String, required: true },
  vendor: VendorSchema,
  invoice: InvoiceSchema,
  createdAt: { type: String, required: true },
  updatedAt: { type: String }
}, {
  timestamps: false // We're handling timestamps manually
});

// Add indexes for better query performance
InvoiceDocumentSchema.index({ 'vendor.name': 'text', 'invoice.number': 'text' });
InvoiceDocumentSchema.index({ fileId: 1 });
InvoiceDocumentSchema.index({ createdAt: -1 });

export const InvoiceModel = mongoose.model<InvoiceDocument>('Invoice', InvoiceDocumentSchema);
