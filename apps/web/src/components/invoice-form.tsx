'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, Plus, Trash2 } from 'lucide-react'

interface InvoiceFormProps {
  data: any
  onSave: () => void
}

export function InvoiceForm({ data, onSave }: InvoiceFormProps) {
  const [formData, setFormData] = useState(data)

  const handleInputChange = (path: string, value: any) => {
    setFormData((prev: any) => {
      const newData = { ...prev }
      const keys = path.split('.')
      let current = newData
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  const addLineItem = () => {
    const newLineItem = {
      description: '',
      unitPrice: 0,
      quantity: 1,
      total: 0
    }
    
    setFormData((prev: any) => ({
      ...prev,
      invoice: {
        ...prev.invoice,
        lineItems: [...prev.invoice.lineItems, newLineItem]
      }
    }))
  }

  const removeLineItem = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      invoice: {
        ...prev.invoice,
        lineItems: prev.invoice.lineItems.filter((_: any, i: number) => i !== index)
      }
    }))
  }

  const updateLineItem = (index: number, field: string, value: any) => {
    setFormData((prev: any) => {
      const newLineItems = [...prev.invoice.lineItems]
      newLineItems[index] = { ...newLineItems[index], [field]: value }
      
      // Recalculate total
      if (field === 'unitPrice' || field === 'quantity') {
        newLineItems[index].total = newLineItems[index].unitPrice * newLineItems[index].quantity
      }
      
      return {
        ...prev,
        invoice: {
          ...prev.invoice,
          lineItems: newLineItems
        }
      }
    })
  }

  const handleSave = async () => {
    try {
      // Here you would save to the API
      console.log('Saving invoice:', formData)
      onSave()
    } catch (error) {
      console.error('Save failed:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Vendor Information */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vendor Name
            </label>
            <input
              type="text"
              value={formData.vendor.name}
              onChange={(e) => handleInputChange('vendor.name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              value={formData.vendor.address || ''}
              onChange={(e) => handleInputChange('vendor.address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax ID
            </label>
            <input
              type="text"
              value={formData.vendor.taxId || ''}
              onChange={(e) => handleInputChange('vendor.taxId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoice Information */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Number
              </label>
              <input
                type="text"
                value={formData.invoice.number}
                onChange={(e) => handleInputChange('invoice.number', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.invoice.date}
                onChange={(e) => handleInputChange('invoice.date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtotal
              </label>
              <input
                type="number"
                value={formData.invoice.subtotal || ''}
                onChange={(e) => handleInputChange('invoice.subtotal', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax %
              </label>
              <input
                type="number"
                value={formData.invoice.taxPercent || ''}
                onChange={(e) => handleInputChange('invoice.taxPercent', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total
              </label>
              <input
                type="number"
                value={formData.invoice.total || ''}
                onChange={(e) => handleInputChange('invoice.total', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Line Items</CardTitle>
            <Button onClick={addLineItem} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.invoice.lineItems.map((item: any, index: number) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit Price
                  </label>
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => updateLineItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total
                  </label>
                  <input
                    type="number"
                    value={item.total}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeLineItem(index)}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center">
          <Save className="h-4 w-4 mr-2" />
          Save Invoice
        </Button>
      </div>
    </div>
  )
}
