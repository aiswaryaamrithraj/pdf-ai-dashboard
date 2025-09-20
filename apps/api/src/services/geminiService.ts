import { GoogleGenerativeAI } from '@google/generative-ai';
import { InvoiceDocument } from '@pdf-dashboard/types';
import { createError } from '../middleware/errorHandler';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const extractWithGemini = async (fileId: string): Promise<InvoiceDocument> => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw createError('GEMINI_API_KEY not configured', 500);
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // In a real application, you would extract text from the PDF file
    // For now, we'll use mock data
    const mockPdfText = `
      INVOICE
      Invoice Number: INV-2024-001
      Date: 2024-01-15
      Vendor: Acme Corporation
      Address: 123 Business St, City, State 12345
      Tax ID: 12-3456789
      
      Line Items:
      1. Web Development Services - $5,000.00 x 1 = $5,000.00
      2. Design Services - $2,500.00 x 1 = $2,500.00
      
      Subtotal: $7,500.00
      Tax (8%): $600.00
      Total: $8,100.00
      
      PO Number: PO-2024-001
      PO Date: 2024-01-10
    `;

    const prompt = `
      Extract invoice data from the following text and return it as a JSON object with this exact structure:
      {
        "fileId": "${fileId}",
        "fileName": "invoice.pdf",
        "vendor": {
          "name": "string",
          "address": "string",
          "taxId": "string"
        },
        "invoice": {
          "number": "string",
          "date": "string",
          "currency": "string",
          "subtotal": number,
          "taxPercent": number,
          "total": number,
          "poNumber": "string",
          "poDate": "string",
          "lineItems": [
            {
              "description": "string",
              "unitPrice": number,
              "quantity": number,
              "total": number
            }
          ]
        },
        "createdAt": "${new Date().toISOString()}"
      }
      
      Text to extract from:
      ${mockPdfText}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    const extractedData = JSON.parse(text);
    
    return extractedData;
  } catch (error) {
    console.error('Gemini extraction error:', error);
    throw createError('Failed to extract data with Gemini', 500);
  }
};
