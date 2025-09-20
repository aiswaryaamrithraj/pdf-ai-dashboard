# MongoDB Atlas Setup Guide

This guide will walk you through setting up a MongoDB Atlas cluster for your PDF AI Dashboard.

## Step 1: Create MongoDB Atlas Account

1. **Go to MongoDB Atlas**: Visit [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Sign Up**: Click "Try Free" or "Start Free"
3. **Create Account**: Use your email or sign up with Google/GitHub
4. **Verify Email**: Check your email and verify your account

## Step 2: Create a New Cluster

1. **Choose Plan**: Select "M0 Sandbox" (Free tier)
   - This gives you 512MB storage
   - Perfect for development and testing
   - No credit card required

2. **Select Cloud Provider**: Choose your preferred provider
   - **AWS** (recommended)
   - **Google Cloud**
   - **Azure**

3. **Choose Region**: Select a region close to you
   - For example: `US East (N. Virginia)` or `Europe (Ireland)`

4. **Cluster Name**: Give your cluster a name
   - Example: `pdf-dashboard-cluster`

5. **Click "Create Cluster"**: Wait 3-5 minutes for setup

## Step 3: Set Up Database Access

1. **Go to Database Access**: Click "Database Access" in the left sidebar
2. **Add New Database User**: Click "Add New Database User"
3. **Authentication Method**: Choose "Password"
4. **Username**: Create a username (e.g., `pdf-dashboard-user`)
5. **Password**: Generate a secure password (save this!)
6. **Database User Privileges**: Select "Read and write to any database"
7. **Click "Add User"**

## Step 4: Set Up Network Access

1. **Go to Network Access**: Click "Network Access" in the left sidebar
2. **Add IP Address**: Click "Add IP Address"
3. **Allow Access From Anywhere**: 
   - Click "Allow Access From Anywhere"
   - This adds `0.0.0.0/0` (all IPs)
   - **Note**: For production, restrict to specific IPs
4. **Click "Confirm"**

## Step 5: Get Connection String

1. **Go to Clusters**: Click "Clusters" in the left sidebar
2. **Connect**: Click "Connect" on your cluster
3. **Choose Connection Method**: Select "Connect your application"
4. **Driver**: Select "Node.js"
5. **Version**: Select "4.1 or later"
6. **Copy Connection String**: It will look like this:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Create Your Database

1. **Connect to Cluster**: Click "Connect" → "Connect with MongoDB Compass"
2. **Download Compass** (optional): Or use the web interface
3. **Create Database**: 
   - Database Name: `pdf-dashboard`
   - Collection Name: `invoices`

## Step 7: Update Your Environment Variables

### For Local Development (apps/api/.env):
```bash
MONGODB_URI=mongodb+srv://pdf-dashboard-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/pdf-dashboard?retryWrites=true&w=majority
```

### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Go to Settings → Environment Variables
3. Add: `MONGODB_URI` with your connection string

## Step 8: Test Connection

### Test with Node.js:
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
};

connectDB();
```

### Test with Your API:
1. Start your API: `npm run dev --workspace=@pdf-dashboard/api`
2. Check the console for connection status
3. Visit: `http://localhost:3001/api/health`

## 🔒 Security Best Practices

### For Development:
- ✅ Use the free M0 tier
- ✅ Allow access from anywhere (0.0.0.0/0)
- ✅ Use a strong password

### For Production:
- 🔒 Use a paid tier (M10 or higher)
- 🔒 Restrict IP access to your server IPs
- 🔒 Use environment variables for credentials
- 🔒 Enable database encryption
- 🔒 Set up monitoring and alerts

## 📊 MongoDB Atlas Features

### Free Tier Includes:
- 512MB storage
- Shared RAM
- Basic monitoring
- Automated backups (for 2 days)

### Paid Tiers Include:
- More storage and RAM
- Advanced monitoring
- Longer backup retention
- Better performance
- Support

## 🚨 Troubleshooting

### Common Issues:

1. **Connection Timeout**:
   - Check if your IP is whitelisted
   - Verify the connection string
   - Check if the cluster is running

2. **Authentication Failed**:
   - Verify username and password
   - Check if the user has proper permissions
   - Ensure the database user exists

3. **Network Access Denied**:
   - Add your IP to the whitelist
   - Use 0.0.0.0/0 for development (not recommended for production)

### Getting Help:
- MongoDB Atlas Documentation: [https://docs.atlas.mongodb.com/](https://docs.atlas.mongodb.com/)
- MongoDB Community: [https://community.mongodb.com/](https://community.mongodb.com/)

## 📝 Quick Checklist

- [ ] Created MongoDB Atlas account
- [ ] Created M0 cluster
- [ ] Set up database user with read/write permissions
- [ ] Added IP address to whitelist (0.0.0.0/0 for development)
- [ ] Copied connection string
- [ ] Updated environment variables
- [ ] Tested connection
- [ ] Ready for deployment!

## 🎯 Next Steps

1. **Set up your cluster** following this guide
2. **Update your environment variables**
3. **Test the connection** locally
4. **Deploy to Vercel** with the connection string
5. **Start building your PDF AI Dashboard!**

---

**Need Help?** Check the MongoDB Atlas documentation or reach out to the MongoDB community for support.
