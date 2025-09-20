# Deployment Guide

This guide will help you deploy the PDF AI Dashboard to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a MongoDB Atlas cluster
3. **AI API Keys**: Get API keys from either:
   - [Google AI Studio](https://aistudio.google.com/) for Gemini
   - [Groq Console](https://console.groq.com/) for Groq

## Step 1: Deploy the API

1. **Connect to Vercel**:
   ```bash
   cd apps/api
   npx vercel
   ```

2. **Set Environment Variables** in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `GEMINI_API_KEY`: Your Gemini API key (optional)
   - `GROQ_API_KEY`: Your Groq API key (optional)
   - `NODE_ENV`: `production`

3. **Deploy**:
   ```bash
   npx vercel --prod
   ```

4. **Note the API URL**: You'll get a URL like `https://pdf-dashboard-api.vercel.app`

## Step 2: Deploy the Web App

1. **Connect to Vercel**:
   ```bash
   cd apps/web
   npx vercel
   ```

2. **Set Environment Variables** in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your API URL from Step 1

3. **Deploy**:
   ```bash
   npx vercel --prod
   ```

4. **Note the Web URL**: You'll get a URL like `https://pdf-dashboard-web.vercel.app`

## Step 3: Update Repository

Update your README.md with the deployed URLs:

```markdown
## 🚀 Live Demos

* **Web App:** https://your-web-url.vercel.app
* **API:** https://your-api-url.vercel.app
```

## Step 4: Test Deployment

1. Visit your web app URL
2. Try uploading a PDF file
3. Test the AI extraction feature
4. Verify CRUD operations work

## Environment Variables Reference

### API (.env)
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pdf-dashboard
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here
NODE_ENV=production
PORT=3001
```

### Web (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://your-api-url.vercel.app/api
```

## Troubleshooting

### Common Issues

1. **API Connection Failed**: Check if `NEXT_PUBLIC_API_URL` is correct
2. **MongoDB Connection Error**: Verify `MONGODB_URI` and network access
3. **AI Extraction Fails**: Ensure API keys are set correctly
4. **Build Failures**: Check TypeScript errors and dependencies

### Logs

- **API Logs**: Check Vercel function logs in dashboard
- **Web Logs**: Check Vercel deployment logs
- **Local Testing**: Use `npm run dev` to test locally

## Production Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Environment variables are set in Vercel
- [ ] API is deployed and accessible
- [ ] Web app is deployed and connects to API
- [ ] PDF upload functionality works
- [ ] AI extraction works with at least one provider
- [ ] CRUD operations work correctly
- [ ] Search functionality works
- [ ] Responsive design works on mobile

## Support

If you encounter issues:
1. Check the logs in Vercel dashboard
2. Verify all environment variables are set
3. Test locally with `npm run dev`
4. Check the GitHub repository for updates
