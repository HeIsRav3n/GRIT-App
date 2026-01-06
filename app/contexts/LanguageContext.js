import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [isLoading, setIsLoading] = useState(true);

    // Available languages
    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        // Add more languages here as needed
    ];

    // Load language preference on mount
    useEffect(() => {
        loadLanguagePreference();
    }, []);

    const loadLanguagePreference = async () => {
        try {
            // Add timeout to prevent hanging on web
            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 1000));
            const storagePromise = AsyncStorage.getItem('language');

            const savedLanguage = await Promise.race([storagePromise, timeoutPromise]);

            if (savedLanguage !== null) {
                setCurrentLanguage(savedLanguage);
                i18n.changeLanguage(savedLanguage);
            }
        } catch (error) {
            console.error('Error loading language preference:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const changeLanguage = async (languageCode) => {
        try {
            setCurrentLanguage(languageCode);
            await i18n.changeLanguage(languageCode);
            await AsyncStorage.setItem('language', languageCode);
        } catch (error) {
            console.error('Error changing language:', error);
        }
    };

    return (
        <LanguageContext.Provider
            value={{
                currentLanguage,
                changeLanguage,
                languages,
                isLoading
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};
