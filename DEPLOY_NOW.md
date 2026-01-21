# 🚀 DEPLOY TO VERCEL - Your Medical Appointment System

## Your GitHub Repo
https://github.com/BaraniDharann/Medical-Appointment-System.git

---

## ⚡ QUICK DEPLOY (30 Minutes Total)

### STEP 1: Push Latest Changes to GitHub (2 min)

Open Command Prompt and run:

```bash
cd "c:\react project\Medical project"
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

---

## 🔥 DEPLOY ON VERCEL (3 Separate Projects)

### PROJECT 1: Backend API (10 min)

#### 1.1 Go to Vercel
- Visit: https://vercel.com/new
- Login with GitHub

#### 1.2 Import Repository
- Click "Import Git Repository"
- Select: `BaraniDharann/Medical-Appointment-System`
- Click "Import"

#### 1.3 Configure Backend
- **Project Name**: `medical-backend` (or any name)
- **Framework Preset**: Other
- **Root Directory**: Click "Edit" → Select `Backend`
- **Build Command**: Leave empty
- **Output Directory**: Leave empty
- **Install Command**: `npm install`

#### 1.4 Add Environment Variables
Click "Environment Variables" and add these:

```
PORT=4000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/prescripto
JWT_SECRET=your_super_secret_key_minimum_32_characters_long
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=Admin@12345
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
RAZORPAY_KEY_ID=rzp_test_your_key
RAZORPAY_PASSWORD=your_razorpay_secret
FRONTEND_URL=https://temp-frontend.vercel.app
ADMIN_URL=https://temp-admin.vercel.app
```

**Note**: Use temporary URLs for now, we'll update them later.

#### 1.5 Deploy
- Click "Deploy"
- Wait 2-3 minutes
- **COPY YOUR BACKEND URL**: `https://medical-backend-xxxx.vercel.app`
- Test it: Visit the URL, should show "API WORKING good"

---

### PROJECT 2: Admin Panel (8 min)

#### 2.1 Import Same Repository Again
- Go to: https://vercel.com/new
- Select: `BaraniDharann/Medical-Appointment-System`
- Click "Import"

#### 2.2 Configure Admin
- **Project Name**: `medical-admin`
- **Framework Preset**: Vite
- **Root Directory**: Click "Edit" → Select `admin`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

#### 2.3 Add Environment Variables
```
VITE_BACKEND_URL=https://medical-backend-xxxx.vercel.app
```
(Use YOUR actual backend URL from Step 1.5)

#### 2.4 Deploy
- Click "Deploy"
- Wait 2-3 minutes
- **COPY YOUR ADMIN URL**: `https://medical-admin-xxxx.vercel.app`

---

### PROJECT 3: Frontend (Patient Portal) (8 min)

#### 3.1 Import Same Repository Again
- Go to: https://vercel.com/new
- Select: `BaraniDharann/Medical-Appointment-System`
- Click "Import"

#### 3.2 Configure Frontend
- **Project Name**: `medical-frontend`
- **Framework Preset**: Vite
- **Root Directory**: Click "Edit" → Select `vite-project`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

#### 3.3 Add Environment Variables
```
VITE_BACKEND_URL=https://medical-backend-xxxx.vercel.app
VITE_ADMIN_URL=https://medical-admin-xxxx.vercel.app
VITE_RAZORPAY_KEY_ID=rzp_test_your_key
```
(Use YOUR actual URLs from previous steps)

#### 3.4 Deploy
- Click "Deploy"
- Wait 2-3 minutes
- **COPY YOUR FRONTEND URL**: `https://medical-frontend-xxxx.vercel.app`

---

## 🔄 STEP 2: Update Backend URLs (5 min)

Now update backend with actual frontend and admin URLs:

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Click on your **Backend** project (`medical-backend`)
3. Go to **Settings** → **Environment Variables**
4. Find and UPDATE these two:
   - `FRONTEND_URL` → Your actual frontend URL
   - `ADMIN_URL` → Your actual admin URL
5. Click "Save"
6. Go to **Deployments** tab
7. Click "..." on the latest deployment → **Redeploy**
8. Wait 2 minutes

---

## ✅ STEP 3: Test Everything (5 min)

### Test Backend
Visit: `https://your-backend.vercel.app`
✅ Should show: "API WORKING good"

### Test Admin Panel
1. Visit: `https://your-admin.vercel.app`
2. Login with:
   - Email: admin@prescripto.com
   - Password: Admin@12345
3. ✅ Dashboard should load
4. ✅ Check "All Appointments"
5. ✅ Check "Add Doctor"

### Test Frontend
1. Visit: `https://your-frontend.vercel.app`
2. ✅ Homepage loads with doctors
3. Click "Create Account" → Register
4. ✅ Login works
5. ✅ Book an appointment
6. ✅ Check "My Appointments"
7. Click "Admin Panel" in navbar → Should open admin

---

## 📝 Your Live URLs

Save these URLs:

| Component | URL | Purpose |
|-----------|-----|---------|
| **Backend API** | https://medical-backend-xxxx.vercel.app | API Server |
| **Admin Panel** | https://medical-admin-xxxx.vercel.app | Doctor/Admin Dashboard |
| **Patient Portal** | https://medical-frontend-xxxx.vercel.app | Patient Booking |

---

## 🔧 If Something Goes Wrong

### Backend Error: "Cannot GET /"
✅ This is normal! Backend is working. Test: `/api/doctor/list`

### Frontend: Doctors not loading
1. Open browser console (F12)
2. Check for errors
3. Verify `VITE_BACKEND_URL` is correct
4. Go to Vercel → Frontend → Settings → Environment Variables

### Admin: Login fails
1. Check backend logs: Vercel → Backend → Functions
2. Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` in backend env
3. Try: `https://your-backend.vercel.app/api/admin/login`

### CORS Error
1. Go to Vercel → Backend → Settings → Environment Variables
2. Update `FRONTEND_URL` and `ADMIN_URL` with correct URLs
3. Redeploy backend

---

## 🎯 Environment Variables Checklist

### Backend (11 variables)
- [ ] PORT
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] ADMIN_EMAIL
- [ ] ADMIN_PASSWORD
- [ ] CLOUDINARY_CLOUD_NAME
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_SECRET_KEY
- [ ] RAZORPAY_KEY_ID
- [ ] RAZORPAY_PASSWORD
- [ ] FRONTEND_URL
- [ ] ADMIN_URL

### Admin (1 variable)
- [ ] VITE_BACKEND_URL

### Frontend (3 variables)
- [ ] VITE_BACKEND_URL
- [ ] VITE_ADMIN_URL
- [ ] VITE_RAZORPAY_KEY_ID

---

## 🔐 Get Your API Keys

### MongoDB Atlas (Database)
1. Go to: https://cloud.mongodb.com
2. Create free cluster
3. Database Access → Add user
4. Network Access → Add IP: `0.0.0.0/0`
5. Connect → Get connection string
6. Format: `mongodb+srv://username:password@cluster.mongodb.net/prescripto`

### Cloudinary (Image Storage)
1. Go to: https://cloudinary.com
2. Sign up free
3. Dashboard → Copy:
   - Cloud Name
   - API Key
   - API Secret

### Razorpay (Payments)
1. Go to: https://razorpay.com
2. Sign up
3. Settings → API Keys → Generate Test Keys
4. Copy:
   - Key ID (starts with `rzp_test_`)
   - Key Secret

---

## 🚀 Making Updates Later

### Update Code
```bash
cd "c:\react project\Medical project"
# Make your changes
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will auto-deploy in 2 minutes! ✨

---

## 🎉 SUCCESS!

Your Medical Appointment System is now LIVE on Vercel!

**Share these URLs:**
- 👥 Patient Portal: https://your-frontend.vercel.app
- 👨⚕️ Admin Panel: https://your-admin.vercel.app

**Admin Login:**
- Email: admin@prescripto.com
- Password: Admin@12345

---

## 💡 Pro Tips

1. **Custom Domain**: Vercel Settings → Domains → Add your domain
2. **Analytics**: Vercel Dashboard → Analytics (free)
3. **Logs**: Vercel → Functions → View logs for debugging
4. **Rollback**: Vercel → Deployments → Redeploy old version

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Your Repo: https://github.com/BaraniDharann/Medical-Appointment-System

**Total Cost: $0 (100% FREE)**
**Total Time: ~30 minutes**

🎊 **Happy Deploying!**
