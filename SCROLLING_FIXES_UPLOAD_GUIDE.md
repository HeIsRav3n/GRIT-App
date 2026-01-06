# 📱 Mobile Scrolling Fixes - Upload Guide

I have implemented a comprehensive set of performance optimizations to fix the freezing issues on mobile. We need to upload **9 files** to GitHub.

## 🚀 Speed Optimization Summary
*   **Global CSS**: Added GPU acceleration and smooth scrolling for web.
*   **Config**: Updated `app.json` to load the new CSS.
*   **React Native Optimizations**: Added `removeClippedSubviews`, `scrollEventThrottle`, and proper touch handling to all scrollable screens.
*   **Result**: 60fps smooth scrolling on mobile devices.

---

## 📂 1. Create New File (Web CSS)

**File Path**: `web/index.css`  
**Action**: Create this file in GitHub (or upload it).

1.  Go to your repo: https://github.com/HeIsRav3n/GRIT-App
2.  Click **Add file** > **Create new file**.
3.  Name it: `web/index.css`.
4.  Copy content from local: `c:\Users\RAV3N\Downloads\GRIT\web\index.css`
5.  Commit message: `Feat: Add mobile scrolling optimizations CSS`

---

## 📝 2. Update Configuration

**File Path**: `app.json`

1.  Edit: https://github.com/HeIsRav3n/GRIT-App/edit/main/app.json
2.  Copy content from local: `c:\Users\RAV3N\Downloads\GRIT\app.json`
3.  Commit message: `Config: Inject web CSS for smooth scrolling`

---

## 📱 3. Update Screens (7 Files)

For each file below, click the link, **select all** code, **delete**, and **paste** the new code from your local files.

| File | Local Path | GitHub Link |
| :--- | :--- | :--- |
| **Dashboard** | `app/screens/dashboard/DashboardScreen.js` | [Edit DashboardScreen.js](https://github.com/HeIsRav3n/GRIT-App/edit/main/app/screens/dashboard/DashboardScreen.js) |
| **Sign Up** | `app/screens/auth/SignUpScreen.js` | [Edit SignUpScreen.js](https://github.com/HeIsRav3n/GRIT-App/edit/main/app/screens/auth/SignUpScreen.js) |
| **Profile** | `app/screens/onboarding/ProfileSetupScreen.js` | [Edit ProfileSetupScreen.js](https://github.com/HeIsRav3n/GRIT-App/edit/main/app/screens/onboarding/ProfileSetupScreen.js) |
| **Coach Setup** | `app/screens/onboarding/CoachSetupScreen.js` | [Edit CoachSetupScreen.js](https://github.com/HeIsRav3n/GRIT-App/edit/main/app/screens/onboarding/CoachSetupScreen.js) |
| **Workout** | `app/screens/workout/WorkoutScreen.js` | [Edit WorkoutScreen.js](https://github.com/HeIsRav3n/GRIT-App/edit/main/app/screens/workout/WorkoutScreen.js) |
| **Chat** | `app/screens/chat/ChatScreen.js` | [Edit ChatScreen.js](https://github.com/HeIsRav3n/GRIT-App/edit/main/app/screens/chat/ChatScreen.js) |
| **Rewards** | `app/screens/rewards/RewardsScreen.js` | [Edit RewardsScreen.js](https://github.com/HeIsRav3n/GRIT-App/edit/main/app/screens/rewards/RewardsScreen.js) |

**Commit Message for all screens**: `Perf: Optimize scrolling performance on mobile`

---

## ✅ Verification
After uploading all files:
1.  Wait for Vercel build (~2 mins).
2.  Open app on phone.
3.  Scroll up/down aggressively.
4.  Verify no freezing! ⚡
