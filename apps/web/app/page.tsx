'use client'

import { useState } from 'react'
import { PDFViewer } from '@/components/pdf-viewer'
import { InvoiceForm } from '@/components/invoice-form'
import { InvoiceList } from '@/components/invoice-list'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, FileText, List } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('upload')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [extractedData, setExtractedData] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            PDF AI Dashboard
          </h1>
          <p className="text-gray-600">
            Upload PDFs, extract data with AI, and manage invoice records
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload & Extract
            </TabsTrigger>
            <TabsTrigger value="view" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              View & Edit
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Invoice List
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>PDF Viewer</CardTitle>
                </CardHeader>
                <CardContent>
                  <PDFViewer 
                    file={uploadedFile}
                    onFileUpload={setUploadedFile}
                    onExtract={setExtractedData}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Extracted Data</CardTitle>
                </CardHeader>
                <CardContent>
                  {extractedData ? (
                    <InvoiceForm 
                      data={extractedData}
                      onSave={() => {
                        setActiveTab('list')
                      }}
                    />
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      Upload a PDF and extract data to see the form
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="view" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Editor</CardTitle>
              </CardHeader>
              <CardContent>
                {extractedData ? (
                  <InvoiceForm 
                    data={extractedData}
                    onSave={() => {
                      setActiveTab('list')
                    }}
                  />
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    No data to edit. Please extract data from a PDF first.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <InvoiceList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
