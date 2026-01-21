# Quick Deployment Commands

## 1. Backend Deployment
```bash
cd "c:\react project\Medical project\Backend"
git init
git add .
git commit -m "Backend for Vercel"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/medical-backend.git
git push -u origin main
```
Then: Import to Vercel → Add environment variables → Deploy

---

## 2. Admin Deployment
```bash
cd "c:\react project\Medical project\admin"
git init
git add .
git commit -m "Admin for Vercel"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/medical-admin.git
git push -u origin main
```
Then: Import to Vercel → Add VITE_BACKEND_URL → Deploy

---

## 3. Frontend Deployment
```bash
cd "c:\react project\Medical project\vite-project"
git init
git add .
git commit -m "Frontend for Vercel"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/medical-frontend.git
git push -u origin main
```
Then: Import to Vercel → Add environment variables → Deploy

---

## Environment Variables Quick Reference

### Backend (.env on Vercel)
```
PORT=4000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_32_chars_minimum
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=Admin@12345
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_SECRET_KEY=xxx
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_PASSWORD=xxx
FRONTEND_URL=https://your-frontend.vercel.app
ADMIN_URL=https://your-admin.vercel.app
```

### Admin (.env on Vercel)
```
VITE_BACKEND_URL=https://your-backend.vercel.app
```

### Frontend (.env on Vercel)
```
VITE_BACKEND_URL=https://your-backend.vercel.app
VITE_ADMIN_URL=https://your-admin.vercel.app
VITE_RAZORPAY_KEY_ID=rzp_test_xxx
```

---

## Deployment Order
1. Backend first (get URL)
2. Admin second (use backend URL)
3. Frontend third (use backend + admin URLs)
4. Update backend with frontend + admin URLs
5. Redeploy backend

---

## Test URLs After Deployment
- Backend: https://your-backend.vercel.app (should show "API WORKING good")
- Admin: https://your-admin.vercel.app
- Frontend: https://your-frontend.vercel.app
