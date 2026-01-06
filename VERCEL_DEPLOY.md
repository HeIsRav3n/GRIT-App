# GRIT - Vercel Deployment Guide

## ✅ Web Build Complete!

The app has been successfully built for web and is ready for deployment.

**Build Output**: `dist/` folder contains the complete web app

---

## Deployment Options

### Option 1: Vercel CLI (Requires Login)

1. **Login to Vercel**:
```bash
vercel login
```
This will open your browser to authenticate.

2. **Deploy to Production**:
```bash
vercel --prod --yes
```

3. **Get Your URL**:
Vercel will provide a production URL like:
`https://grit-[random].vercel.app`

---

### Option 2: Vercel Dashboard (No CLI Required)

1. **Go to**: https://vercel.com/new

2. **Import Git Repository** OR **Deploy from Folder**:
   - Click "Add New Project"
   - Select "Import Git Repository" or drag the GRIT folder

3. **Configure Project**:
   - Framework Preset: **Other**
   - Build Command: `expo export -p web`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**:
   - Click "Deploy"
   - Wait 1-2 minutes
   - Get your live URL!

---

### Option 3: Manual Upload (Fastest)

1. **Go to**: https://vercel.com/new

2. **Drag and Drop**:
   - Drag the `dist` folder directly to Vercel
   - Or click "Browse" and select the `dist` folder

3. **Deploy**:
   - Vercel will automatically deploy
   - Get your URL instantly!

---

## Quick Deploy Steps (Recommended)

**If you have a Vercel account:**

1. Open https://vercel.com/new in your browser
2. Drag the `C:\Users\RAV3N\Downloads\GRIT\dist` folder to the upload area
3. Click "Deploy"
4. Done! Your app will be live in ~30 seconds

**If you don't have a Vercel account:**

1. Go to https://vercel.com/signup
2. Sign up (free, no credit card required)
3. Follow the "Manual Upload" steps above

---

## What's Been Done

✅ Installed web dependencies (react-dom, react-native-web)
✅ Configured app.json for web
✅ Created vercel.json configuration
✅ Fixed image paths for web compatibility
✅ Built the web version (exported to `dist/`)

---

## Your App Features on Web

The web version includes:
- ✅ Authentication (Sign Up / Login)
- ✅ Dashboard with streak and motivational quotes
- ✅ Workout Library with exercise details
- ✅ AI Coach Chat with quick replies
- ✅ Rewards & Streak Calendar
- ✅ Profile Management
- ✅ Theme Toggle (Dark/Light)
- ✅ Language Switcher
- ⚠️ QR Code Scanner (camera not available on web)
- ⚠️ Profile Picture Upload (limited on web)

---

## Alternative: Deploy to Other Platforms

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --dir=dist --prod
```

### GitHub Pages
1. Push to GitHub
2. Go to Settings → Pages
3. Select branch and `/dist` folder
4. Deploy

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

---

## Troubleshooting

### Build Errors
If you need to rebuild:
```bash
npx expo export -p web
```

### Vercel Login Issues
```bash
vercel logout
vercel login
```

### Port Already in Use
```bash
# Kill the Metro bundler first
# Then rebuild
```

---

## Next Steps

1. **Choose your deployment method** (Manual upload is fastest!)
2. **Deploy the app**
3. **Share your live URL!**

Your app will be accessible at:
`https://your-app-name.vercel.app`

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Expo Web Docs: https://docs.expo.dev/workflow/web/

**The app is ready to deploy right now!** 🚀
