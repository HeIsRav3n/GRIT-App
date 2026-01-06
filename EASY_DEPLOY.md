# Easy Vercel Deployment - Step by Step

## The Problem
Vercel doesn't support drag-and-drop folder upload in the browser. You must use either:
1. Git (GitHub/GitLab)
2. Vercel CLI (Command Line)

## ✅ Easiest Solution: Vercel CLI (Already Installed!)

I've already installed Vercel CLI for you. Here's what to do:

### Step 1: Login to Vercel
Open your terminal in the GRIT folder and run:
```bash
vercel login
```

**What happens:**
- A browser window will open
- Click "Continue" to authorize
- You'll see "Congratulations! You are now logged in"
- Close the browser and return to terminal

### Step 2: Deploy
Run this command:
```bash
vercel --yes
```

**What happens:**
- Vercel will ask a few questions (just press Enter for defaults)
- It will upload your app
- You'll get a URL like: `https://grit-abc123.vercel.app`

### Step 3: Make it Production
Run:
```bash
vercel --prod
```

Done! Your app is live! 🎉

---

## Alternative: Use GitHub (If you prefer)

### Step 1: Create GitHub Repo
1. Go to https://github.com/new
2. Name it "GRIT"
3. Click "Create repository"

### Step 2: Push Your Code
Run these commands in your GRIT folder:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/GRIT.git
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to https://vercel.com/new
2. Click "Import" next to your GRIT repository
3. Configure:
   - Build Command: `expo export -p web`
   - Output Directory: `dist`
4. Click "Deploy"

---

## 🚀 Quick Start (Recommended)

**Just run these 2 commands:**

```bash
vercel login
```
(Browser will open, click Continue)

```bash
vercel --prod --yes
```
(Wait 1-2 minutes, get your URL!)

---

## Need Help?

If you get stuck, let me know at which step and I'll help you!
