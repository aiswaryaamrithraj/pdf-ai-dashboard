'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Edit, Trash2, Eye } from 'lucide-react'
import { InvoiceDocument } from '@pdf-dashboard/types'

interface InvoiceListProps {}

export function InvoiceList({}: InvoiceListProps) {
  const [invoices, setInvoices] = useState<InvoiceDocument[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock data for demonstration
    const mockInvoices = [
      {
        _id: '1',
        fileId: 'file-1',
        fileName: 'invoice-001.pdf',
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
            }
          ]
        },
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        _id: '2',
        fileId: 'file-2',
        fileName: 'invoice-002.pdf',
        vendor: {
          name: 'Tech Solutions Inc',
          address: '456 Innovation Ave, Tech City, TC 67890',
          taxId: '98-7654321'
        },
        invoice: {
          number: 'INV-2024-002',
          date: '2024-01-20',
          currency: 'USD',
          subtotal: 14000,
          taxPercent: 10,
          total: 15400,
          poNumber: 'PO-2024-002',
          poDate: '2024-01-18',
          lineItems: [
            {
              description: 'Software Development',
              unitPrice: 8000,
              quantity: 1,
              total: 8000
            }
          ]
        },
        createdAt: '2024-01-20T14:30:00Z'
      }
    ]
    
    setTimeout(() => {
      setInvoices(mockInvoices)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredInvoices = invoices.filter(invoice => 
    invoice.vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.invoice.number.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string | undefined) => {
    if (!id) return
    if (confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(prev => prev.filter(invoice => invoice._id !== id))
    }
  }

  const formatCurrency = (amount: number | undefined) => {
    if (!amount) return '$0.00'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading invoices...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by vendor name or invoice number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoice Table */}
      <Card>
        <CardContent className="p-0">
          {filteredInvoices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No invoices found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {invoice.invoice.number}
                          </div>
                          <div className="text-sm text-gray-500">
                            {invoice.fileName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {invoice.vendor.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {invoice.vendor.taxId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(invoice.invoice.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(invoice.invoice.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(invoice._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
