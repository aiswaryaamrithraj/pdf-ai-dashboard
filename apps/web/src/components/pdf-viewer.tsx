'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, FileText, Download } from 'lucide-react'

interface PDFViewerProps {
  file: File | null
  onFileUpload: (file: File | null) => void
  onExtract: (data: any) => void
}

export function PDFViewer({ file, onFileUpload, onExtract }: PDFViewerProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setIsUploading(true)
      try {
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        onFileUpload(selectedFile)
      } catch (error) {
        console.error('Upload failed:', error)
      } finally {
        setIsUploading(false)
      }
    }
  }

  const handleExtract = async () => {
    if (!file) return
    
    setIsExtracting(true)
    try {
      // Simulate AI extraction
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock extracted data
      const mockData = {
        fileId: 'mock-file-id',
        fileName: file.name,
        vendor: {
          name: 'Acme Corporation',
          address: '123 Business St, City, State 12345',
          taxId: '12-3456789'
        },
        invoice: {
          number: 'INV-2024-001',
          date: '2024-01-15',
          currency: 'USD',
          subtotal: 7500,
          taxPercent: 8,
          total: 8100,
          poNumber: 'PO-2024-001',
          poDate: '2024-01-10',
          lineItems: [
            {
              description: 'Web Development Services',
              unitPrice: 5000,
              quantity: 1,
              total: 5000
            },
            {
              description: 'Design Services',
              unitPrice: 2500,
              quantity: 1,
              total: 2500
            }
          ]
        },
        createdAt: new Date().toISOString()
      }
      
      onExtract(mockData)
    } catch (error) {
      console.error('Extraction failed:', error)
    } finally {
      setIsExtracting(false)
    }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Upload a PDF file
          </h3>
          <p className="text-gray-500 mb-4">
            Choose a PDF file to upload and extract data from
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Choose PDF File'}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-red-500" />
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFileUpload(null)}
            >
              Remove
            </Button>
          </div>
          
          <div className="border rounded-lg p-4 bg-white">
            <div className="aspect-[3/4] bg-gray-100 rounded flex items-center justify-center">
              <div className="text-center">
                <FileText className="mx-auto h-16 w-16 text-gray-400 mb-2" />
                <p className="text-gray-500">PDF Preview</p>
                <p className="text-sm text-gray-400">PDF.js viewer would be here</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={handleExtract}
              disabled={isExtracting}
              className="flex-1"
            >
              {isExtracting ? 'Extracting...' : 'Extract with AI'}
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
