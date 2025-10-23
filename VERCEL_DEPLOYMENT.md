# 🚀 Vercel Deployment Guide with GitHub Actions

This guide will help you automatically deploy your Notes API (Frontend + Backend) to Vercel whenever you push to GitHub.

---

## 📋 Prerequisites

1. ✅ GitHub account
2. ✅ Vercel account (sign up at [vercel.com](https://vercel.com))
3. ✅ MongoDB Atlas account (for production database)

---

## 🔧 Step 1: Setup Vercel Projects

### A. Install Vercel CLI (Optional, for local testing)
```bash
npm install -g vercel
```

### B. Create Two Vercel Projects

1. **Go to [vercel.com/dashboard](https://vercel.com/dashboard)**

2. **Import Backend:**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Set **Root Directory**: `Backend`
   - Framework Preset: Other
   - Click "Deploy"

3. **Import Frontend:**
   - Click "Add New" → "Project"  
   - Import the same GitHub repository again
   - Set **Root Directory**: `Frontend`
   - Framework Preset: Vite
   - Click "Deploy"

---

## 🔑 Step 2: Get Vercel Token

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name it: `GitHub Actions`
4. Copy the token (you'll need it for GitHub Secrets)

---

## 🔐 Step 3: Setup GitHub Secrets

1. **Go to your GitHub repository**
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:
   - **Name**: `VERCEL_TOKEN`
   - **Value**: Paste the Vercel token you copied

---

## ⚙️ Step 4: Configure Vercel Projects

### **Backend Configuration:**

1. Go to your Backend project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add the following variables:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | `mongodb+srv://username:password@cluster.mongodb.net/notesdb` |
| `JWT_SECRET` | Your JWT secret key | `your-super-secret-jwt-key-here` |
| `PORT` | `3080` | `3080` |
| `NODE_ENV` | `production` | `production` |

4. **Important**: Click "Production" for all variables

### **Frontend Configuration:**

1. Go to your Frontend project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | Your deployed backend URL (e.g., `https://your-backend.vercel.app`) |

---

## 📝 Step 5: Update Frontend API URL

You need to use environment variable for API URL in production.

**Update `Frontend/src/api/auth.ts` and `Frontend/src/api/notes.ts`:**

```typescript
// Replace hardcoded URL with:
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3080';
```

---

## 🎯 Step 6: How It Works

### **Automatic Deployment:**
- Every time you `git push` to `master` or `main` branch
- GitHub Actions automatically triggers
- Deploys both Frontend and Backend to Vercel
- Takes 2-3 minutes

### **Manual Deployment:**
```bash
# Deploy Backend
cd Backend
vercel --prod

# Deploy Frontend  
cd Frontend
vercel --prod
```

---

## 📂 Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── Backend/
│   ├── vercel.json            # Vercel backend config
│   └── src/
│       └── server.js          # Entry point
├── Frontend/
│   ├── vercel.json            # Vercel frontend config
│   └── ...
```

---

## 🔍 Verify Deployment

1. **Check GitHub Actions:**
   - Go to your repo → **Actions** tab
   - You should see workflows running after each push

2. **Check Vercel Dashboard:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Both projects should show "Ready"

3. **Test Your Apps:**
   - Frontend: `https://your-frontend.vercel.app`
   - Backend: `https://your-backend.vercel.app/api/getnotes`

---

## ⚠️ Important Notes

### **Backend CORS Configuration:**

Make sure your Backend allows requests from your Frontend domain.

**Update `Backend/src/app.js`:**
```javascript
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000',
  'https://your-frontend.vercel.app' // Add your Vercel frontend URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

### **MongoDB Atlas Network Access:**
1. Go to MongoDB Atlas
2. Click **Network Access**
3. Add IP: `0.0.0.0/0` (Allow from anywhere) - Required for Vercel

---

## 🐛 Troubleshooting

### **Deployment Failed?**
- Check GitHub Actions logs for errors
- Verify all environment variables are set correctly
- Make sure `VERCEL_TOKEN` secret is added to GitHub

### **Backend API Not Working?**
- Check Vercel backend logs
- Verify MongoDB connection string
- Ensure MongoDB allows connections from `0.0.0.0/0`

### **Frontend Can't Connect to Backend?**
- Verify `VITE_API_URL` is set correctly
- Check CORS configuration in backend
- Ensure backend is deployed and working

---

## 📊 Deployment Status Badge (Optional)

Add this to your README.md:

```markdown
![Deploy Status](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/Deploy%20to%20Vercel/badge.svg)
```

---

## 🎉 Done!

Your Notes API is now automatically deployed to Vercel! 
Every push to master/main will trigger a new deployment.

**Frontend URL**: `https://your-frontend.vercel.app`  
**Backend URL**: `https://your-backend.vercel.app`
