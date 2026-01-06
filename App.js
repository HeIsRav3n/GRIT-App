import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from './app/contexts/ThemeContext';
import { AuthProvider } from './app/contexts/AuthContext';
import { CoachProvider } from './app/contexts/CoachContext';
import { LanguageProvider } from './app/contexts/LanguageContext';
import { AppNavigator } from './app/navigation/AppNavigator';
import { Platform } from 'react-native';
import './app/locales/i18n';

// Cache Clearing Script for Web
if (Platform.OS === 'web') {
  // 1. Unregister all service workers to prevent stale code
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }

  // 2. Clear application cache if supported
  if ('caches' in window) {
    caches.keys().then((names) => {
      for (let name of names) {
        caches.delete(name);
      }
    });
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CoachProvider>
            <StatusBar barStyle="light-content" />
            <AppNavigator />
          </CoachProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
