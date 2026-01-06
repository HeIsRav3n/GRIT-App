# GRIT - AI Fitness Coach Mobile App

A comprehensive cross-platform mobile fitness application built with React Native and Expo.

## Features

✅ **Authentication System**
- Sign up with profile picture upload
- Login with email/phone
- Secure password handling

✅ **AI Fitness Coach**
- Personalized workout plans
- Goal-based training
- Adaptive intensity levels
- Multi-step coach setup

✅ **Workout Library**
- Comprehensive exercise database
- Detailed instructions and form tips
- Common mistakes and alternatives
- Category filtering (Strength, Cardio, HIIT, Stretching)

✅ **Chat System**
- AI coach chat with natural responses
- Quick reply chips for common requests
- Working back button and message sending

✅ **Rewards & Streak System**
- Daily check-in tracking
- Visual calendar with highlighted days
- Milestone badges (7, 14, 30, 60 days)
- Longest streak tracking

✅ **Profile Management**
- Editable user profile
- QR code for adding friends
- Camera scanner for QR codes
- Settings and preferences

✅ **Theme System**
- Dark and light modes
- Instant toggle from top bar
- High contrast for legibility
- Persistent theme preference

✅ **Internationalization**
- Full app translation support
- Language switcher in top bar
- Currently supports English (expandable)

✅ **Modern UI/UX**
- Clean, premium design
- Smooth animations
- Proper spacing and typography
- Motivational quotes
- "Built By Rav3n" footer in sleepy green

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Setup

1. Clone or navigate to the project directory:
```bash
cd GRIT
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
   - **iOS**: Press `i` in the terminal or scan QR code with Expo Go app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in the terminal

## Project Structure

```
GRIT/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Button, Input, etc.
│   │   └── navigation/     # TopBar, etc.
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.js
│   │   ├── ThemeContext.js
│   │   ├── LanguageContext.js
│   │   └── CoachContext.js
│   ├── data/               # Static data
│   │   ├── quotes.js
│   │   └── workoutLibrary.js
│   ├── locales/            # Translations
│   │   ├── en.json
│   │   └── i18n.js
│   ├── navigation/         # Navigation setup
│   │   └── AppNavigator.js
│   ├── screens/            # Screen components
│   │   ├── auth/
│   │   ├── onboarding/
│   │   ├── dashboard/
│   │   ├── workout/
│   │   ├── chat/
│   │   ├── rewards/
│   │   ├── profile/
│   │   └── qr/
│   ├── services/           # Business logic
│   ├── theme/              # Theme configuration
│   │   ├── colors.js
│   │   ├── typography.js
│   │   └── spacing.js
│   └── utils/              # Utility functions
├── assets/                 # Images, fonts, etc.
├── App.js                  # Root component
└── package.json
```

## Key Technologies

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **i18next** - Internationalization
- **AsyncStorage** - Local data persistence
- **Expo Camera** - QR code scanning
- **React Native QRCode SVG** - QR code generation

## Features Implemented

### Core Screens
- ✅ Splash Screen
- ✅ Login Screen
- ✅ Sign Up Screen
- ✅ Profile Setup Screen
- ✅ Coach Setup Screen
- ✅ Dashboard Screen
- ✅ Workout Library Screen
- ✅ Exercise Detail Screen
- ✅ Chat Screen
- ✅ Rewards Screen
- ✅ Profile Screen
- ✅ QR Code Screen

### Components
- ✅ TopBar with Language/Notifications/Theme Toggle
- ✅ Button Component (multiple variants)
- ✅ Input Component (with validation)
- ✅ Proper spacing between top bar icons

### Data & Logic
- ✅ Authentication flow
- ✅ Theme persistence
- ✅ Language persistence
- ✅ Workout library with 10+ exercises
- ✅ Motivational quotes system
- ✅ Streak tracking
- ✅ AI coach responses

## Usage

### First Time Setup
1. Launch the app
2. Sign up with username, email/phone, and password
3. Optionally upload a profile picture
4. Complete profile setup (gender, age, height, weight, fitness level)
5. Set up AI coach (goals, intensity, frequency, session time)
6. Start using the app!

### Daily Use
1. Check your dashboard for today's workout
2. View your current streak
3. Chat with AI coach for guidance
4. Browse workout library for exercises
5. Track your progress in rewards section
6. Share your QR code to add friends

## Customization

### Adding New Languages
1. Create a new translation file in `app/locales/` (e.g., `es.json`)
2. Copy the structure from `en.json`
3. Translate all strings
4. Import in `app/locales/i18n.js`
5. Add to language list in `LanguageContext.js`

### Adding New Exercises
1. Open `app/data/workoutLibrary.js`
2. Add new exercise object to the `exercises` array
3. Include all required fields (name, category, targetMuscle, difficulty, etc.)

### Customizing Theme Colors
1. Edit `app/theme/colors.js`
2. Modify colors in `light` and `dark` objects
3. Changes will apply app-wide

## Known Limitations

- Voice coach feature not yet implemented
- Some placeholder screens (Health, Settings, Edit Profile, Hydration, Progress)
- AI coach uses rule-based responses (not connected to external AI service)
- Workout plan generation is simplified
- No backend integration (all data stored locally)

## Future Enhancements

- [ ] Complete health section with detailed questionnaire
- [ ] Implement hydration tracking with reminders
- [ ] Add progress charts and analytics
- [ ] Voice coach with text-to-speech
- [ ] Backend integration for data sync
- [ ] Social features (friends, challenges)
- [ ] Workout video demonstrations
- [ ] Nutrition tracking
- [ ] Integration with fitness wearables

## Troubleshooting

### Metro Bundler Issues
```bash
npm start -- --reset-cache
```

### Dependency Issues
```bash
rm -rf node_modules
npm install
```

### Camera Not Working
- Ensure camera permissions are granted in device settings
- On iOS simulator, camera is not available

## License

Built by Rav3n

## Support

For issues or questions, please refer to the documentation or contact support.
