# Building GRIT for Appetize.io

## Overview
Appetize.io allows you to run iOS and Android apps in the browser. To upload GRIT, you need to build the app first.

## Option 1: EAS Build (Recommended)

### Prerequisites
- Expo account (free at expo.dev)
- EAS CLI installed

### Steps

1. **Install EAS CLI**
```bash
npm install -g eas-cli
```

2. **Login to Expo**
```bash
eas login
```

3. **Configure EAS Build**
```bash
eas build:configure
```

4. **Build for iOS Simulator** (for Appetize.io)
```bash
eas build --platform ios --profile preview
```

This will:
- Build your app in the cloud
- Create a `.app` file (simulator build)
- Provide a download link when complete
- Take approximately 10-20 minutes

5. **Download the Build**
Once complete, download the `.tar.gz` file and extract the `.app` file.

6. **Upload to Appetize.io**
- Go to https://appetize.io/apps?platform=ios
- Click "Upload App"
- Select the `.app` file
- Configure settings (device type, OS version)
- Get your shareable link

## Option 2: Local Build (Mac Only)

### Prerequisites
- macOS with Xcode installed
- Xcode Command Line Tools

### Steps

1. **Prebuild the app**
```bash
npx expo prebuild --platform ios
```

2. **Open in Xcode**
```bash
open ios/GRIT.xcworkspace
```

3. **Build for Simulator**
- Select a simulator device
- Product → Build
- Find the `.app` file in DerivedData

4. **Upload to Appetize.io**
Same as Option 1, step 6.

## Option 3: Expo Development Build

### Steps

1. **Create a development build**
```bash
eas build --profile development --platform ios
```

2. **Install on simulator or device**
3. **Use Expo Go alternative**

## Appetize.io Requirements

### File Types Accepted
- **iOS**: `.app` (simulator) or `.ipa` (device)
- **Android**: `.apk` or `.aab`

### Free Tier Limits
- 100 minutes/month of app streaming
- Apps expire after 30 days of inactivity
- Public apps only

### Recommended Settings
- **Device**: iPhone 14 or iPhone 15
- **OS Version**: iOS 16 or iOS 17
- **Orientation**: Portrait
- **Scale**: 75% or 100%

## Quick Start (Fastest Method)

If you have an Expo account:

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure (first time only)
eas build:configure

# Build for simulator
eas build --platform ios --profile preview

# Wait for build to complete (10-20 min)
# Download the .tar.gz file
# Extract the .app file
# Upload to Appetize.io
```

## Alternative: Web Demo

If you want a quick demo without building:

```bash
# Run on web
npm run web
```

Then deploy to:
- Vercel
- Netlify
- GitHub Pages

## Troubleshooting

### Build Fails
- Check `app.json` configuration
- Ensure all dependencies are compatible
- Review build logs in Expo dashboard

### Upload Fails
- Ensure file is `.app` (not `.ipa` for free tier)
- Check file size (max 500MB)
- Verify iOS version compatibility

### App Crashes on Appetize
- Test locally first
- Check for simulator-specific issues
- Review Appetize.io logs

## Cost Considerations

### Expo EAS Build
- Free tier: 30 builds/month
- Paid: $29/month for unlimited builds

### Appetize.io
- Free: 100 minutes/month
- Starter: $40/month for 500 minutes
- Team: $150/month for 2000 minutes

## Next Steps

1. Choose your build method
2. Create the build
3. Upload to Appetize.io
4. Share the link!

Your app will be accessible at:
`https://appetize.io/app/YOUR_APP_ID`
