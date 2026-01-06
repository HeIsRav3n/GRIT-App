import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

const CoachContext = createContext();

export const CoachProvider = ({ children }) => {
    const { user } = useAuth();
    const [coachProfile, setCoachProfile] = useState(null);
    const [workoutPlan, setWorkoutPlan] = useState(null);
    const [currentWeek, setCurrentWeek] = useState(1);
    const [streak, setStreak] = useState({ current: 0, longest: 0, checkInDates: [] });
    const [progress, setProgress] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load coach data on mount
    useEffect(() => {
        if (user) {
            loadCoachData();
        } else {
            // No user, exit loading state immediately
            setIsLoading(false);
        }
    }, [user]);

    const loadCoachData = async () => {
        try {
            // Add timeout to prevent hanging on web
            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve([null, null, null, null]), 1000));
            const storagePromise = Promise.all([
                AsyncStorage.getItem(`coachProfile_${user.id}`),
                AsyncStorage.getItem(`workoutPlan_${user.id}`),
                AsyncStorage.getItem(`streak_${user.id}`),
                AsyncStorage.getItem(`progress_${user.id}`),
            ]);

            const [profileData, planData, streakData, progressData] = await Promise.race([storagePromise, timeoutPromise]);

            if (profileData) setCoachProfile(JSON.parse(profileData));
            if (planData) setWorkoutPlan(JSON.parse(planData));
            if (streakData) setStreak(JSON.parse(streakData));
            if (progressData) setProgress(JSON.parse(progressData));
        } catch (error) {
            console.error('Error loading coach data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveCoachProfile = useCallback(async (profileData) => {
        try {
            if (!user || !user.id) {
                console.error('No user found when trying to save coach profile');
                return { success: false, error: 'No user logged in' };
            }
            await AsyncStorage.setItem(
                `coachProfile_${user.id}`,
                JSON.stringify(profileData)
            );
            setCoachProfile(profileData);
            return { success: true };
        } catch (error) {
            console.error('Error saving coach profile:', error);
            return { success: false, error: error.message };
        }
    }, [user]);

    const saveWorkoutPlan = useCallback(async (plan) => {
        try {
            if (!user || !user.id) {
                console.error('No user found when trying to save workout plan');
                return { success: false, error: 'No user logged in' };
            }
            await AsyncStorage.setItem(
                `workoutPlan_${user.id}`,
                JSON.stringify(plan)
            );
            setWorkoutPlan(plan);
            return { success: true };
        } catch (error) {
            console.error('Error saving workout plan:', error);
            return { success: false, error: error.message };
        }
    }, [user]);

    const recordWorkout = async (workoutData) => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const newProgress = {
                date: today,
                ...workoutData,
            };

            const updatedProgress = [...progress, newProgress];
            await AsyncStorage.setItem(
                `progress_${user.id}`,
                JSON.stringify(updatedProgress)
            );
            setProgress(updatedProgress);

            // Update streak
            await updateStreak(today);

            return { success: true };
        } catch (error) {
            console.error('Error recording workout:', error);
            return { success: false, error: error.message };
        }
    };

    const updateStreak = async (date) => {
        try {
            const checkInDates = [...streak.checkInDates];
            if (!checkInDates.includes(date)) {
                checkInDates.push(date);
                checkInDates.sort();

                // Calculate current streak
                let currentStreak = 1;
                const today = new Date(date);
                for (let i = checkInDates.length - 2; i >= 0; i--) {
                    const checkDate = new Date(checkInDates[i]);
                    const diffDays = Math.floor((today - checkDate) / (1000 * 60 * 60 * 24));
                    if (diffDays === currentStreak) {
                        currentStreak++;
                    } else {
                        break;
                    }
                }

                const longestStreak = Math.max(streak.longest, currentStreak);

                const updatedStreak = {
                    current: currentStreak,
                    longest: longestStreak,
                    checkInDates,
                };

                await AsyncStorage.setItem(
                    `streak_${user.id}`,
                    JSON.stringify(updatedStreak)
                );
                setStreak(updatedStreak);
            }
        } catch (error) {
            console.error('Error updating streak:', error);
        }
    };

    const submitFeedback = async (feedback) => {
        try {
            // Store feedback and use it to adapt the workout plan
            const feedbackData = {
                date: new Date().toISOString(),
                feedback,
            };

            // In a real implementation, this would trigger plan adaptation
            console.log('Feedback received:', feedbackData);
            return { success: true };
        } catch (error) {
            console.error('Error submitting feedback:', error);
            return { success: false, error: error.message };
        }
    };

    return (
        <CoachContext.Provider
            value={{
                coachProfile,
                workoutPlan,
                currentWeek,
                streak,
                progress,
                isLoading,
                saveCoachProfile,
                saveWorkoutPlan,
                recordWorkout,
                submitFeedback,
            }}
        >
            {children}
        </CoachContext.Provider>
    );
};

export const useCoach = () => {
    const context = useContext(CoachContext);
    if (!context) {
        throw new Error('useCoach must be used within CoachProvider');
    }
    return context;
};
