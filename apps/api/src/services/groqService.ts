import Groq from 'groq-sdk';
import { InvoiceDocument } from '@pdf-dashboard/types';
import { createError } from '../middleware/errorHandler';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export const extractWithGroq = async (fileId: string): Promise<InvoiceDocument> => {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw createError('GROQ_API_KEY not configured', 500);
    }

    // In a real application, you would extract text from the PDF file
    // For now, we'll use mock data
    const mockPdfText = `
      INVOICE
      Invoice Number: INV-2024-002
      Date: 2024-01-20
      Vendor: Tech Solutions Inc
      Address: 456 Innovation Ave, Tech City, TC 67890
      Tax ID: 98-7654321
      
      Line Items:
      1. Software Development - $8,000.00 x 1 = $8,000.00
      2. Consulting Services - $3,000.00 x 2 = $6,000.00
      
      Subtotal: $14,000.00
      Tax (10%): $1,400.00
      Total: $15,400.00
      
      PO Number: PO-2024-002
      PO Date: 2024-01-18
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

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama3-8b-8192',
      temperature: 0,
    });

    const text = completion.choices[0]?.message?.content || '';
    
    // Parse the JSON response
    const extractedData = JSON.parse(text);
    
    return extractedData;
  } catch (error) {
    console.error('Groq extraction error:', error);
    throw createError('Failed to extract data with Groq', 500);
  }
};
