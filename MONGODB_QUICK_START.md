# MongoDB Atlas Quick Start 🚀

## Visual Setup Guide

```
1. Go to MongoDB Atlas
   https://www.mongodb.com/cloud/atlas
   
   ↓
   
2. Sign Up (Free)
   [Try Free] → Create Account → Verify Email
   
   ↓
   
3. Create Cluster
   [Build a Database] → [M0 Sandbox] → [Create]
   
   ↓
   
4. Set Up Access
   [Database Access] → [Add New Database User]
   Username: pdf-dashboard-user
   Password: [Generate Secure Password]
   
   ↓
   
5. Network Access
   [Network Access] → [Add IP Address] → [Allow Access From Anywhere]
   
   ↓
   
6. Get Connection String
   [Clusters] → [Connect] → [Connect your application]
   Copy the connection string
   
   ↓
   
7. Update Environment
   Add to apps/api/.env:
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pdf-dashboard
```

## 🎯 What You'll Get

```
Your Connection String:
mongodb+srv://pdf-dashboard-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/pdf-dashboard?retryWrites=true&w=majority
```

## ⚡ Quick Commands

```bash
# Test your connection
npm run dev --workspace=@pdf-dashboard/api

# Check if it works
curl http://localhost:3001/api/health
```

## 🔧 Environment Variables

```bash
# apps/api/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pdf-dashboard
GEMINI_API_KEY=your_gemini_key_here
GROQ_API_KEY=your_groq_key_here
NODE_ENV=development
PORT=3001
```

## ✅ Success Indicators

- ✅ Cluster shows "Running" status
- ✅ Database user created successfully
- ✅ IP address whitelisted
- ✅ Connection string copied
- ✅ API starts without errors
- ✅ Health check returns 200 OK

## 🆘 Need Help?

1. **Check the detailed guide**: [MONGODB_SETUP.md](./MONGODB_SETUP.md)
2. **MongoDB Documentation**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com/)
3. **Common Issues**: See troubleshooting section in MONGODB_SETUP.md

---

**Time to complete**: ~10-15 minutes
**Cost**: Free (M0 tier)
**Difficulty**: Easy ⭐⭐
