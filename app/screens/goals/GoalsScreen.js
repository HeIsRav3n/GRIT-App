import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCoach } from '../../contexts/CoachContext';
import { Button } from '../../components/common/Button';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

export const GoalsScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { progress } = useCoach();
    const { t } = useTranslation();

    const [selectedGoals, setSelectedGoals] = useState([]);

    const fitnessGoals = [
        { id: 'fatLoss', label: t('coach.fatLoss'), icon: '🔥', description: 'Burn fat and lose weight' },
        { id: 'muscleGain', label: t('coach.muscleGain'), icon: '💪', description: 'Build muscle mass' },
        { id: 'leanToned', label: t('coach.leanToned'), icon: '🎯', description: 'Get defined and toned' },
        { id: 'strength', label: t('coach.strength'), icon: '🏋️', description: 'Increase strength and power' },
        { id: 'endurance', label: t('coach.endurance'), icon: '🏃', description: 'Improve stamina' },
        { id: 'flexibility', label: t('coach.flexibility'), icon: '🧘', description: 'Better mobility and flexibility' },
        { id: 'posture', label: t('coach.posture'), icon: '🧍', description: 'Fix posture issues' },
        { id: 'overallHealth', label: t('coach.overallHealth'), icon: '❤️', description: 'General health improvement' },
    ];

    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {
        try {
            const data = await AsyncStorage.getItem('userGoals');
            if (data) {
                setSelectedGoals(JSON.parse(data));
            } else if (user?.goals) {
                setSelectedGoals(user.goals);
            }
        } catch (error) {
            console.log('Error loading goals:', error);
        }
    };

    const toggleGoal = (goalId) => {
        if (selectedGoals.includes(goalId)) {
            setSelectedGoals(selectedGoals.filter(g => g !== goalId));
        } else {
            setSelectedGoals([...selectedGoals, goalId]);
        }
    };

    const saveGoals = async () => {
        try {
            await AsyncStorage.setItem('userGoals', JSON.stringify(selectedGoals));
            navigation.goBack();
        } catch (error) {
            console.log('Error saving goals:', error);
        }
    };

    const getGoalProgress = (goalId) => {
        // Simulated progress - in a real app this would come from workout data
        const progressMap = {
            fatLoss: 45,
            muscleGain: 30,
            leanToned: 55,
            strength: 60,
            endurance: 40,
            flexibility: 25,
            posture: 35,
            overallHealth: 50,
        };
        return progressMap[goalId] || 0;
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: spacing.lg,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
        },
        backButton: {
            padding: spacing.sm,
            marginRight: spacing.md,
        },
        backButtonText: {
            fontSize: 24,
            color: theme.colors.text,
        },
        headerTitle: {
            ...textStyles.h3,
            color: theme.colors.text,
            flex: 1,
        },
        scrollContent: {
            padding: spacing.lg,
            paddingBottom: 200,
            flexGrow: 1,
        },
        introCard: {
            backgroundColor: theme.colors.primary + '15',
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginBottom: spacing.lg,
            borderLeftWidth: 4,
            borderLeftColor: theme.colors.primary,
        },
        introTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.xs,
        },
        introText: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
        },
        sectionTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.md,
            marginTop: spacing.md,
        },
        goalsGrid: {
            gap: spacing.md,
        },
        goalCard: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: 'transparent',
            ...shadows.small,
        },
        goalCardSelected: {
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.primary + '10',
        },
        goalIcon: {
            fontSize: 36,
            marginRight: spacing.md,
        },
        goalContent: {
            flex: 1,
        },
        goalLabel: {
            ...textStyles.body,
            color: theme.colors.text,
            fontWeight: 'bold',
        },
        goalDescription: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
            marginTop: 2,
        },
        goalProgress: {
            marginTop: spacing.sm,
        },
        progressBar: {
            height: 6,
            backgroundColor: theme.colors.border,
            borderRadius: borderRadius.round,
            overflow: 'hidden',
        },
        progressFill: {
            height: '100%',
            backgroundColor: theme.colors.primary,
            borderRadius: borderRadius.round,
        },
        progressText: {
            ...textStyles.caption,
            color: theme.colors.primary,
            marginTop: 4,
            fontWeight: 'bold',
        },
        checkMark: {
            width: 28,
            height: 28,
            borderRadius: 14,
            borderWidth: 2,
            borderColor: theme.colors.border,
            alignItems: 'center',
            justifyContent: 'center',
        },
        checkMarkSelected: {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
        },
        checkMarkText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
        },
        summaryCard: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginTop: spacing.lg,
            ...shadows.medium,
        },
        summaryTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.md,
        },
        summaryRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: spacing.sm,
        },
        summaryLabel: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
        },
        summaryValue: {
            ...textStyles.body,
            color: theme.colors.primary,
            fontWeight: 'bold',
        },
        buttonContainer: {
            padding: spacing.lg,
            paddingBottom: spacing.xl,
            backgroundColor: theme.colors.background,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('profile.goals')}</Text>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }]}
                showsVerticalScrollIndicator={true}
                bounces={true}
            >
                {/* Intro Card */}
                <View style={styles.introCard}>
                    <Text style={styles.introTitle}>🎯 Set Your Fitness Goals</Text>
                    <Text style={styles.introText}>
                        Select your goals and track your progress. Your AI coach will personalize workouts based on these.
                    </Text>
                </View>

                {/* Goals Selection */}
                <Text style={styles.sectionTitle}>Select Your Goals</Text>
                <View style={styles.goalsGrid}>
                    {fitnessGoals.map((goal) => {
                        const isSelected = selectedGoals.includes(goal.id);
                        const progressValue = getGoalProgress(goal.id);

                        return (
                            <TouchableOpacity
                                key={goal.id}
                                style={[styles.goalCard, isSelected && styles.goalCardSelected]}
                                onPress={() => toggleGoal(goal.id)}
                            >
                                <Text style={styles.goalIcon}>{goal.icon}</Text>
                                <View style={styles.goalContent}>
                                    <Text style={styles.goalLabel}>{goal.label}</Text>
                                    <Text style={styles.goalDescription}>{goal.description}</Text>

                                    {isSelected && (
                                        <View style={styles.goalProgress}>
                                            <View style={styles.progressBar}>
                                                <View style={[styles.progressFill, { width: `${progressValue}%` }]} />
                                            </View>
                                            <Text style={styles.progressText}>{progressValue}% progress</Text>
                                        </View>
                                    )}
                                </View>
                                <View style={[styles.checkMark, isSelected && styles.checkMarkSelected]}>
                                    {isSelected && <Text style={styles.checkMarkText}>✓</Text>}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Summary Card */}
                {selectedGoals.length > 0 && (
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryTitle}>📊 Goals Summary</Text>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Goals selected:</Text>
                            <Text style={styles.summaryValue}>{selectedGoals.length}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Average progress:</Text>
                            <Text style={styles.summaryValue}>
                                {Math.round(selectedGoals.reduce((sum, g) => sum + getGoalProgress(g), 0) / selectedGoals.length)}%
                            </Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Coach focus:</Text>
                            <Text style={styles.summaryValue}>Personalized</Text>
                        </View>
                    </View>
                )}
            </ScrollView>

            <View style={styles.buttonContainer}>
                <Button title={t('common.save')} onPress={saveGoals} />
            </View>
        </SafeAreaView>
    );
};
