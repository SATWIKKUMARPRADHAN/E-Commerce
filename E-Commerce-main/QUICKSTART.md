# Quick Start Guide

## ⚡ Fast Setup (3 Steps)

### Step 1: Install Dependencies
```bash
cd e-commerce/server && npm install
cd ../client && npm install
```

### Step 2: Start Backend (Terminal 1)
```bash
cd e-commerce/server
npm start
```
✅ Should see: "Server running on http://localhost:5000"

### Step 3: Start Frontend (Terminal 2)
```bash
cd e-commerce/client
npm run dev
```
✅ Should see: "Local: http://localhost:3000"

## 🎯 Open Browser
Go to: **http://localhost:3000**

## ❌ Common Issues & Fixes

### Issue: "Cannot find module"
**Fix:** Make sure you ran `npm install` in both `server/` and `client/` folders

### Issue: "Port 5000 already in use"
**Fix:** 
- Close other applications using port 5000
- Or change PORT in `server/server.js` (line 10)

### Issue: "Port 3000 already in use"
**Fix:**
- Close other applications using port 3000
- Or change port in `client/vite.config.js` (line 8)

### Issue: "Cannot GET /api/..."
**Fix:** Make sure backend server is running on port 5000

### Issue: CORS errors in browser
**Fix:** Backend server must be running before frontend

### Issue: "Module not found" errors
**Fix:** 
1. Delete `node_modules` folders
2. Delete `package-lock.json` files
3. Run `npm install` again in both folders

## 📁 Project Structure

```
e-commerce/
├── client/          ← Frontend (React + Vite)
│   └── src/
│       ├── pages/   ← Your pages here
│       └── api.js   ← API calls
│
└── server/          ← Backend (Express)
    ├── server.js    ← Start server here
    ├── routes.js    ← API endpoints
    └── data.js      ← Dummy data
```

## ✅ Verify Installation

1. **Backend working?** 
   - Open: http://localhost:5000/health
   - Should see: `{"status":"OK","message":"Server is running"}`

2. **Frontend working?**
   - Open: http://localhost:3000
   - Should see: "Welcome to E-Commerce Platform"

3. **API working?**
   - Open: http://localhost:5000/api/admin/dashboard
   - Should see: JSON with dashboard data

## 🆘 Still Not Working?

1. Check Node.js version: `node --version` (should be v16+)
2. Check if ports are free: `netstat -ano | findstr :5000` (Windows)
3. Check terminal for error messages
4. Make sure you're in the correct directory when running commands

