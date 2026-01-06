import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../theme/colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load theme preference on mount
    useEffect(() => {
        loadThemePreference();
    }, []);

    const loadThemePreference = async () => {
        try {
            // Add timeout to prevent hanging on web
            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 1000));
            const storagePromise = AsyncStorage.getItem('theme');

            const savedTheme = await Promise.race([storagePromise, timeoutPromise]);

            if (savedTheme !== null) {
                setIsDark(savedTheme === 'dark');
            }
        } catch (error) {
            console.error('Error loading theme preference:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleTheme = async () => {
        try {
            const newTheme = !isDark;
            setIsDark(newTheme);
            await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    };

    const theme = {
        colors: isDark ? colors.dark : colors.light,
        isDark,
    };

    // Don't block rendering while loading
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isLoading }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
