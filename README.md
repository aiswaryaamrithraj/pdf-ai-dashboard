# PDF AI Dashboard

A full-stack PDF Review Dashboard with AI-powered data extraction from invoices and documents. Built with a monorepo architecture using Next.js, Node.js, MongoDB, and AI services.

## 🚀 Live Demos

* **Web App:** https://pdf-dashboard-web.vercel.app
* **API:** https://pdf-dashboard-api.vercel.app

## ✨ Features

- **PDF Viewer:** Upload and view PDF documents with zoom and page navigation
- **AI Data Extraction:** Extract invoice data using Gemini or Groq AI
- **CRUD Operations:** Create, read, update, and delete invoice records
- **Search & Filtering:** Search invoices by vendor name or invoice number
- **Responsive Design:** Modern UI built with shadcn/ui and Tailwind CSS

## 🛠️ Tech Stack

- **Monorepo:** Turborepo
- **Frontend:** Next.js 14 (App Router), TypeScript, shadcn/ui
- **Backend:** Node.js, TypeScript, Express.js
- **Database:** MongoDB Atlas
- **AI Services:** Gemini API or Groq
- **PDF Viewer:** pdf.js
- **Deployment:** Vercel

## 📁 Project Structure

```
pdf-ai-dashboard/
├── apps/
│   ├── web/                 # Next.js frontend
│   └── api/                 # Node.js backend
├── packages/
│   └── types/               # Shared TypeScript types
├── package.json             # Root package.json
└── turbo.json              # Turborepo configuration
```

## ⚙️ Setup & Local Development

### Prerequisites

- Node.js (v18 or higher)
- npm
- MongoDB Atlas account
- Gemini API Key or Groq API Key

### 1. Clone the Repository

```bash
git clone https://github.com/aiswaryaamrithraj/pdf-ai-dashboard.git
cd pdf-ai-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

#### API Environment Variables

Create `apps/api/.env`:

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pdf-dashboard

# AI Services (choose one or both)
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here

# Server
PORT=3001
NODE_ENV=development
```

#### Web Environment Variables

Create `apps/web/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 4. Run Development Servers

```bash
# Start both web and API servers
npm run dev

# Or start individually
npm run dev --workspace=@pdf-dashboard/web
npm run dev --workspace=@pdf-dashboard/api
```

- **Web App:** http://localhost:3000
- **API:** http://localhost:3001

## 📚 API Documentation

### Endpoints

#### Upload PDF
```http
POST /api/upload
Content-Type: multipart/form-data

Body: pdf file (max 25MB)
```

#### Extract Data
```http
POST /api/extract
Content-Type: application/json

{
  "fileId": "uuid",
  "model": "gemini" | "groq"
}
```

#### Get Invoices
```http
GET /api/invoices?q=search_term
```

#### Get Invoice by ID
```http
GET /api/invoices/:id
```

#### Update Invoice
```http
PUT /api/invoices/:id
Content-Type: application/json

{
  "vendor": { "name": "Updated Name" },
  "invoice": { "total": 1000 }
}
```

#### Delete Invoice
```http
DELETE /api/invoices/:id
```

### Data Structure

```typescript
interface InvoiceDocument {
  _id?: string;
  fileId: string;
  fileName: string;
  vendor: {
    name: string;
    address?: string;
    taxId?: string;
  };
  invoice: {
    number: string;
    date: string;
    currency?: string;
    subtotal?: number;
    taxPercent?: number;
    total?: number;
    poNumber?: string;
    poDate?: string;
    lineItems: Array<{
      description: string;
      unitPrice: number;
      quantity: number;
      total: number;
    }>;
  };
  createdAt: string;
  updatedAt?: string;
}
```

## 🚀 Deployment

### Deploy to Vercel

1. **Deploy API:**
   ```bash
   cd apps/api
   vercel --prod
   ```

2. **Deploy Web App:**
   ```bash
   cd apps/web
   vercel --prod
   ```

3. **Set Environment Variables** in Vercel dashboard for both apps.

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests for specific workspace
npm run test --workspace=@pdf-dashboard/api
npm run test --workspace=@pdf-dashboard/web
```

## 📝 Scripts

```bash
# Development
npm run dev              # Start all apps in development
npm run build           # Build all apps
npm run lint            # Lint all apps
npm run type-check      # Type check all apps
npm run clean           # Clean all build artifacts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.