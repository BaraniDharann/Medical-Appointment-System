# 🚀 DEPLOYMENT GUIDE - Medical Project

## Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Render account (sign up at render.com)
- MongoDB Atlas account
- Cloudinary account
- Razorpay account

---

## PART 1: Deploy Backend to Render (15 min)

### Step 1: Push Backend to GitHub
```bash
cd "c:\react project\Medical project\Backend"
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Render
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: medical-backend (or your choice)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Step 3: Add Environment Variables on Render
Click "Environment" tab and add:
```
PORT=4000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_random_secret_key_here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=YourStrongPassword@123
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_PASSWORD=your_razorpay_secret
FRONTEND_URL=https://your-frontend.vercel.app
ADMIN_URL=https://your-admin.vercel.app
```

### Step 4: Deploy
- Click "Create Web Service"
- Wait 5-10 minutes for deployment
- Copy your backend URL: `https://medical-backend-xxxx.onrender.com`

---

## PART 2: Deploy Frontend to Vercel (10 min)

### Step 1: Push Frontend to GitHub
```bash
cd "c:\react project\Medical project\vite-project"
git init
git add .
git commit -m "Initial frontend commit"
git branch -M main
git remote add origin YOUR_FRONTEND_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your frontend repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Add Environment Variables on Vercel
Click "Environment Variables" and add:
```
VITE_BACKEND_URL=https://your-backend.onrender.com
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_ADMIN_URL=https://your-admin.vercel.app
```

### Step 4: Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Copy your frontend URL: `https://your-frontend.vercel.app`

---

## PART 3: Deploy Admin Panel to Vercel (10 min)

### Step 1: Push Admin to GitHub
```bash
cd "c:\react project\Medical project\admin"
git init
git add .
git commit -m "Initial admin commit"
git branch -M main
git remote add origin YOUR_ADMIN_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your admin repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Add Environment Variables on Vercel
```
VITE_BACKEND_URL=https://your-backend.onrender.com
```

### Step 4: Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Copy your admin URL: `https://your-admin.vercel.app`

---

## PART 4: Update Environment Variables (5 min)

### Update Backend on Render
Go back to Render dashboard → Your backend service → Environment
Update these variables with actual URLs:
```
FRONTEND_URL=https://your-actual-frontend.vercel.app
ADMIN_URL=https://your-actual-admin.vercel.app
```
Click "Save Changes" (backend will auto-redeploy)

### Update Frontend on Vercel
Go to Vercel dashboard → Your frontend project → Settings → Environment Variables
Update:
```
VITE_ADMIN_URL=https://your-actual-admin.vercel.app
```
Go to Deployments → Click "..." → "Redeploy"

---

## PART 5: Testing (5 min)

### Test Backend
Visit: `https://your-backend.onrender.com`
Should see: "API WORKING good"

### Test Frontend
1. Visit: `https://your-frontend.vercel.app`
2. Check if doctors list loads
3. Try registration/login
4. Book an appointment

### Test Admin Panel
1. Visit: `https://your-admin.vercel.app`
2. Login with admin credentials
3. Check dashboard
4. Try adding a doctor

---

## 🎯 Quick Reference URLs

After deployment, save these:
- **Frontend**: https://your-frontend.vercel.app
- **Admin**: https://your-admin.vercel.app
- **Backend**: https://your-backend.onrender.com
- **MongoDB**: mongodb+srv://...

---

## 🔧 Troubleshooting

### Backend not working?
- Check Render logs
- Verify all environment variables
- Check MongoDB connection string
- Wait 30 seconds (cold start on free tier)

### Frontend not loading data?
- Check browser console for errors
- Verify VITE_BACKEND_URL is correct
- Check CORS settings in backend

### Images not uploading?
- Verify Cloudinary credentials
- Check file size limits

### Payment not working?
- Use Razorpay test keys for testing
- Check Razorpay dashboard for webhooks

---

## 📝 Important Notes

1. **Free Tier Limitations**:
   - Render: Sleeps after 15 min inactivity (30s cold start)
   - Vercel: Unlimited deployments
   - MongoDB Atlas: 512MB storage

2. **Security**:
   - Never commit .env files
   - Use strong passwords
   - Keep JWT_SECRET secure

3. **Updates**:
   - Push to GitHub → Auto-deploys on Vercel
   - Push to GitHub → Auto-deploys on Render

---

## ✅ Deployment Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Admin deployed on Vercel
- [ ] All environment variables set
- [ ] CORS updated with actual URLs
- [ ] MongoDB Atlas connected
- [ ] Cloudinary working
- [ ] Razorpay configured
- [ ] Test registration/login
- [ ] Test appointment booking
- [ ] Test admin panel
- [ ] Test payment flow

---

## 🎉 Success!

Your Medical Appointment System is now live!

**Share these URLs with users:**
- Patient Portal: https://your-frontend.vercel.app
- Admin Panel: https://your-admin.vercel.app

**Default Admin Login:**
- Email: (from your ADMIN_EMAIL env)
- Password: (from your ADMIN_PASSWORD env)
