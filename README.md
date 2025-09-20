# pdf-ai-dashboard
This project is a full-stack, PDF Viewer + Data Extraction Dashboard, designed to streamline data extraction from invoices and other documents.

A full-stack application for uploading, viewing, and extracting data from PDFs using AI. This project leverages a monorepo architecture with Next.js for the frontend, a Node.js API, and MongoDB for data storage. AI data extraction is powered by the Gemini or Groq API.

## 🚀 Live Demos

- **Web App:** [https://pdf-dashboard-web.vercel.app](https://pdf-dashboard-web.vercel.app)
- **API:** [https://pdf-dashboard-api.vercel.app](https://pdf-dashboard-api.vercel.app)

---

## ✨ Features

- **PDF Viewer:** Upload and view PDF documents directly in the browser.
- **AI Extraction:** Use Gemini or Groq to automatically extract key invoice data.
- **CRUD Operations:** Edit, save, and manage extracted data with full CRUD functionality.
- **Search & Filtering:** Easily search for invoices by vendor name or invoice number.
- **Monorepo:** Organized codebase using a monorepo structure with separate `web` and `api` applications.

---

## 🛠️ Tech Stack

- **Monorepo:** [Turborepo](https://turborepo.org)
- **Frontend:** [Next.js (App Router)](https://nextjs.org), [TypeScript](https://www.typescriptlang.org), [shadcn/ui](https://ui.shadcn.com)
- **Backend:** [Node.js](https://nodejs.org), [TypeScript](https://www.typescriptlang.org), [Express.js](https://expressjs.com)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **AI:** [Gemini API](https://ai.google.dev/) or [Groq](https://groq.com)
- **PDF Viewer:** [pdf.js](https://mozilla.github.io/pdf.js/)
- **Deployment:** [Vercel](https://vercel.com)

---

## ⚙️ Setup & Local Development

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Gemini API Key](https://ai.google.dev/) or [Groq API Key](https://groq.com)

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/pdf-dashboard.git](https://github.com/your-username/pdf-dashboard.git)
cd pdf-dashboard
