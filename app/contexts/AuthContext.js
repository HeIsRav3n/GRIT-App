import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [onboardingComplete, setOnboardingComplete] = useState(false);

    // Load user data on mount
    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            // Add timeout to prevent hanging on web
            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 1000));
            const storagePromise = AsyncStorage.getItem('user');

            const userData = await Promise.race([storagePromise, timeoutPromise]);

            if (userData !== null) {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                // Only set authenticated if onboarding is complete
                const onboarding = parsedUser.onboardingComplete || false;
                setOnboardingComplete(onboarding);
                // CHANGE: Allow access if user exists, even if onboarding isn't done
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (userData) => {
        try {
            // Generate unique ID for user
            const userId = Date.now().toString();
            const newUser = {
                id: userId,
                ...userData,
                createdAt: new Date().toISOString(),
            };

            await AsyncStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);

            setOnboardingComplete(false);
            setIsAuthenticated(true); // CHANGE: Set to true immediately after signup

            return { success: true };
        } catch (error) {
            console.error('Error signing up:', error);
            return { success: false, error: error.message };
        }
    };

    const login = async (email, password) => {
        try {
            // In a real app, this would validate against a backend
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const parsedUser = JSON.parse(userData);
                // Simple validation (in production, use proper authentication)
                if (parsedUser.email === email || parsedUser.phone === email) {
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                    return { success: true };
                }
            }
            return { success: false, error: 'Invalid credentials' };
        } catch (error) {
            console.error('Error logging in:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            setIsAuthenticated(false);
            // Note: We keep user data in storage for re-login
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const completeOnboarding = async () => {
        try {
            console.log('🎯 completeOnboarding called! Current user:', user);
            const updatedUser = { ...user, onboardingComplete: true };

            console.log('💾 Saving updated user to AsyncStorage:', updatedUser);
            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
            console.log('✅ User saved to AsyncStorage');

            // Update states - no delay needed with new architecture!
            setUser(updatedUser);
            setOnboardingComplete(true);
            console.log('✅ Onboarding complete! AppNavigator will now show Main tabs.');

            return { success: true };
        } catch (error) {
            console.error('❌ Error completing onboarding:', error);
            return { success: false, error: error.message };
        }
    };

    const updateProfile = async (updates) => {
        try {
            const updatedUser = { ...user, ...updates };
            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            return { success: true };
        } catch (error) {
            console.error('Error updating profile:', error);
            return { success: false, error: error.message };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                onboardingComplete,
                signUp,
                login,
                logout,
                updateProfile,
                completeOnboarding,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
