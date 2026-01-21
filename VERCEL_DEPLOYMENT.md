# 🚀 VERCEL DEPLOYMENT GUIDE - All Components

## Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com - free)
- MongoDB Atlas account (free)
- Cloudinary account (free)
- Razorpay account (free)

---

## 📦 PART 1: Deploy Backend to Vercel (10 min)

### Step 1: Push Backend to GitHub
```bash
cd "c:\react project\Medical project\Backend"
git init
git add .
git commit -m "Backend for Vercel"
git branch -M main
# Create new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/medical-backend.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com/new
2. Click "Import Project"
3. Import your Backend repository
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)

### Step 3: Add Environment Variables
Click "Environment Variables" tab and add ALL these:

```
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/prescripto
JWT_SECRET=your_random_secret_minimum_32_characters
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=Admin@12345
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_PASSWORD=your_razorpay_secret_key
FRONTEND_URL=https://medical-frontend.vercel.app
ADMIN_URL=https://medical-admin.vercel.app
```

**Important**: Use temporary URLs for FRONTEND_URL and ADMIN_URL (we'll update later)

### Step 4: Deploy
- Click "Deploy"
- Wait 2-3 minutes
- **Copy Backend URL**: `https://medical-backend-xxxx.vercel.app`

---

## 🎨 PART 2: Deploy Admin Panel to Vercel (8 min)

### Step 1: Push Admin to GitHub
```bash
cd "c:\react project\Medical project\admin"
git init
git add .
git commit -m "Admin panel for Vercel"
git branch -M main
# Create new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/medical-admin.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com/new
2. Import your Admin repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Add Environment Variables
```
VITE_BACKEND_URL=https://medical-backend-xxxx.vercel.app
```
(Use your actual backend URL from Part 1)

### Step 4: Deploy
- Click "Deploy"
- Wait 2-3 minutes
- **Copy Admin URL**: `https://medical-admin-xxxx.vercel.app`

---

## 💻 PART 3: Deploy Frontend to Vercel (8 min)

### Step 1: Push Frontend to GitHub
```bash
cd "c:\react project\Medical project\vite-project"
git init
git add .
git commit -m "Frontend for Vercel"
git branch -M main
# Create new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/medical-frontend.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com/new
2. Import your Frontend repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Add Environment Variables
```
VITE_BACKEND_URL=https://medical-backend-xxxx.vercel.app
VITE_ADMIN_URL=https://medical-admin-xxxx.vercel.app
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```
(Use your actual URLs from Part 1 & 2)

### Step 4: Deploy
- Click "Deploy"
- Wait 2-3 minutes
- **Copy Frontend URL**: `https://medical-frontend-xxxx.vercel.app`

---

## 🔄 PART 4: Update Backend Environment Variables (5 min)

Now that you have all URLs, update Backend:

1. Go to Vercel Dashboard
2. Select your **Backend** project
3. Go to **Settings** → **Environment Variables**
4. Update these two variables:
   ```
   FRONTEND_URL=https://medical-frontend-xxxx.vercel.app
   ADMIN_URL=https://medical-admin-xxxx.vercel.app
   ```
   (Use your actual URLs)

5. Go to **Deployments** tab
6. Click "..." on latest deployment → **Redeploy**
7. Wait 2 minutes

---

## ✅ PART 5: Testing (5 min)

### Test Backend API
Visit: `https://medical-backend-xxxx.vercel.app`
Should see: **"API WORKING good"**

### Test Admin Panel
1. Visit: `https://medical-admin-xxxx.vercel.app`
2. Login with:
   - Email: (your ADMIN_EMAIL)
   - Password: (your ADMIN_PASSWORD)
3. Check dashboard loads
4. Try viewing doctors list

### Test Frontend
1. Visit: `https://medical-frontend-xxxx.vercel.app`
2. Check doctors list loads on homepage
3. Click "Create Account" → Register
4. Login with new account
5. Try booking an appointment
6. Check "My Appointments"

---

## 📝 Quick Setup Checklist

### Before Starting:
- [ ] MongoDB Atlas cluster created
- [ ] Cloudinary account setup (get API keys)
- [ ] Razorpay account setup (get test keys)
- [ ] GitHub account ready
- [ ] Vercel account created

### Deployment Order:
- [ ] 1. Deploy Backend to Vercel
- [ ] 2. Deploy Admin to Vercel
- [ ] 3. Deploy Frontend to Vercel
- [ ] 4. Update Backend environment variables
- [ ] 5. Test all three applications

---

## 🎯 Your Live URLs

After deployment, save these:

| Component | URL |
|-----------|-----|
| **Backend API** | https://medical-backend-xxxx.vercel.app |
| **Admin Panel** | https://medical-admin-xxxx.vercel.app |
| **Patient Portal** | https://medical-frontend-xxxx.vercel.app |

---

## 🔧 Troubleshooting

### Backend API not working?
- Check Vercel logs (Functions tab)
- Verify MongoDB connection string
- Check all environment variables are set
- Test: `https://your-backend.vercel.app/api/doctor/list`

### Frontend not loading doctors?
- Open browser console (F12)
- Check for CORS errors
- Verify VITE_BACKEND_URL is correct
- Check Network tab for failed requests

### Admin panel login fails?
- Verify ADMIN_EMAIL and ADMIN_PASSWORD in backend
- Check backend logs
- Try backend login API directly

### Images not uploading?
- Verify Cloudinary credentials
- Check file size (max 10MB)
- Check Cloudinary dashboard for uploads

### Payment not working?
- Use Razorpay TEST keys for testing
- Check Razorpay dashboard
- Verify RAZORPAY_KEY_ID matches in frontend and backend

---

## 🚨 Common Errors & Fixes

### Error: "Module not found"
**Fix**: Redeploy with `npm install` in build settings

### Error: "CORS policy blocked"
**Fix**: Update FRONTEND_URL and ADMIN_URL in backend env variables

### Error: "MongoDB connection failed"
**Fix**: 
1. Check MongoDB Atlas → Network Access → Add `0.0.0.0/0`
2. Verify connection string format
3. Check username/password (no special characters)

### Error: "Vercel Function timeout"
**Fix**: Free tier has 10s timeout - optimize database queries

---

## 💡 Important Notes

### Vercel Free Tier Limits:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Serverless functions (10s timeout)
- ✅ Automatic HTTPS
- ✅ Custom domains

### MongoDB Atlas Free Tier:
- ✅ 512MB storage
- ✅ Shared cluster
- ⚠️ ~10,000 appointments capacity

### Auto-Deployment:
- Push to GitHub → Vercel auto-deploys
- No manual redeployment needed
- Check deployment status in Vercel dashboard

---

## 🔐 Security Best Practices

1. **Never commit .env files**
2. **Use strong JWT_SECRET** (min 32 characters)
3. **Change default admin password**
4. **Use Razorpay LIVE keys only in production**
5. **Enable MongoDB IP whitelist** (or use 0.0.0.0/0 for Vercel)

---

## 📱 Custom Domain (Optional)

### Add Custom Domain to Vercel:
1. Go to Project Settings → Domains
2. Add your domain (e.g., `prescripto.com`)
3. Update DNS records as shown
4. Update environment variables with new domain

---

## 🎉 Success!

Your complete Medical Appointment System is now live on Vercel!

**Share these URLs:**
- 👨‍⚕️ **Admin Panel**: https://medical-admin-xxxx.vercel.app
- 👥 **Patient Portal**: https://medical-frontend-xxxx.vercel.app

**Default Admin Login:**
- Email: admin@prescripto.com (or your ADMIN_EMAIL)
- Password: Admin@12345 (or your ADMIN_PASSWORD)

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- Cloudinary: https://cloudinary.com/documentation
- Razorpay: https://razorpay.com/docs/

---

## 🔄 Making Updates

### Update Backend:
```bash
cd Backend
# Make changes
git add .
git commit -m "Update backend"
git push
# Vercel auto-deploys in 2 minutes
```

### Update Frontend/Admin:
```bash
cd vite-project  # or admin
# Make changes
git add .
git commit -m "Update frontend"
git push
# Vercel auto-deploys in 2 minutes
```

---

**🎊 Congratulations! Your project is live on Vercel!**
