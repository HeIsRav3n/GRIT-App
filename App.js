import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from './app/contexts/ThemeContext';
import { AuthProvider } from './app/contexts/AuthContext';
import { CoachProvider } from './app/contexts/CoachContext';
import { LanguageProvider } from './app/contexts/LanguageContext';
import { AppNavigator } from './app/navigation/AppNavigator';
import './app/locales/i18n';

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
