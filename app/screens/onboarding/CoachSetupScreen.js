import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCoach } from '../../contexts/CoachContext';
import { Button } from '../../components/common/Button';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

export const CoachSetupScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { completeOnboarding } = useAuth();
    const { saveCoachProfile, saveWorkoutPlan } = useCoach();
    const { t } = useTranslation();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        goals: [],
        intensity: 'medium',
        frequency: 3,
        sessionTime: 45,
        cardioIntensity: 'moderate',
        conditions: [],
        injuries: [],
    });

    const goals = [
        { value: 'fatLoss', label: t('coach.fatLoss'), icon: '🔥' },
        { value: 'muscleGain', label: t('coach.muscleGain'), icon: '💪' },
        { value: 'leanToned', label: t('coach.leanToned'), icon: '✨' },
        { value: 'strength', label: t('coach.strength'), icon: '🏋️' },
        { value: 'endurance', label: t('coach.endurance'), icon: '🏃' },
        { value: 'flexibility', label: t('coach.flexibility'), icon: '🧘' },
    ];

    const intensityLevels = [
        { value: 'easy', label: t('workout.easy'), icon: '😌' },
        { value: 'medium', label: t('workout.medium'), icon: '💪' },
        { value: 'hard', label: t('workout.hard'), icon: '🔥' },
        { value: 'extreme', label: t('workout.extreme'), icon: '⚡' },
    ];

    const toggleGoal = (goal) => {
        if (formData.goals.includes(goal)) {
            setFormData({
                ...formData,
                goals: formData.goals.filter((g) => g !== goal),
            });
        } else {
            setFormData({
                ...formData,
                goals: [...formData.goals, goal],
            });
        }
    };


    const handleFinish = async () => {
        try {
            console.log('🚀 Starting onboarding completion...');

            // Save coach profile
            console.log('💾 Saving coach profile...', formData);
            const profileResult = await saveCoachProfile(formData);
            console.log('✅ Coach profile saved:', profileResult);

            // Generate initial workout plan (simplified for now)
            const mockPlan = {
                weekNumber: 1,
                schedule: [
                    {
                        day: 1,
                        type: 'strength',
                        exercises: [],
                        duration: formData.sessionTime,
                    },
                ],
            };
            console.log('💾 Saving workout plan...', mockPlan);
            const planResult = await saveWorkoutPlan(mockPlan);
            console.log('✅ Workout plan saved:', planResult);

            // Mark onboarding as complete - this will trigger AppNavigator to show Main tabs
            console.log('🎯 Completing onboarding...');
            const onboardingResult = await completeOnboarding();
            console.log('✅ Onboarding completed:', onboardingResult);

            console.log('🎉 All done! Should navigate to dashboard now...');
        } catch (error) {
            console.error('❌ Error in handleFinish:', error);
            alert(`Error completing setup: ${error.message}`);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        scrollContent: {
            padding: spacing.lg,
            paddingBottom: spacing.xxl,
        },
        title: {
            ...textStyles.h2,
            color: theme.colors.text,
            marginBottom: spacing.md,
        },
        subtitle: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
            marginBottom: spacing.xl,
        },
        stepIndicator: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: spacing.xl,
            gap: spacing.sm,
        },
        stepDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: theme.colors.border,
        },
        stepDotActive: {
            backgroundColor: theme.colors.primary,
            width: 30,
        },
        section: {
            marginBottom: spacing.xl,
        },
        sectionTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.md,
        },
        goalsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: spacing.sm,
        },
        goalCard: {
            width: '48%',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            alignItems: 'center',
            borderWidth: 2,
            borderColor: 'transparent',
        },
        goalCardSelected: {
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.primary + '20',
        },
        goalIcon: {
            fontSize: 32,
            marginBottom: spacing.xs,
        },
        goalLabel: {
            ...textStyles.bodySmall,
            color: theme.colors.text,
            textAlign: 'center',
        },
        optionsContainer: {
            gap: spacing.sm,
        },
        option: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            borderWidth: 2,
            borderColor: 'transparent',
        },
        optionSelected: {
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.primary + '20',
        },
        optionIcon: {
            fontSize: 24,
            marginRight: spacing.md,
        },
        optionText: {
            ...textStyles.body,
            color: theme.colors.text,
            flex: 1,
        },
        frequencyContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
        },
        frequencyLabel: {
            ...textStyles.body,
            color: theme.colors.text,
        },
        frequencyControls: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.md,
        },
        frequencyButton: {
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        frequencyButtonText: {
            ...textStyles.h4,
            color: '#FFFFFF',
        },
        frequencyValue: {
            ...textStyles.h4,
            color: theme.colors.primary,
            minWidth: 40,
            textAlign: 'center',
        },
        buttonContainer: {
            flexDirection: 'row',
            gap: spacing.md,
            padding: spacing.lg,
            paddingBottom: spacing.xl,
            backgroundColor: theme.colors.background,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
        },
    });

    const renderStep1 = () => (
        <>
            <Text style={styles.title}>What Are Your Goals?</Text>
            <Text style={styles.subtitle}>Select all that apply</Text>

            <View style={styles.goalsGrid}>
                {goals.map((goal) => (
                    <TouchableOpacity
                        key={goal.value}
                        style={[
                            styles.goalCard,
                            formData.goals.includes(goal.value) && styles.goalCardSelected,
                        ]}
                        onPress={() => toggleGoal(goal.value)}
                    >
                        <Text style={styles.goalIcon}>{goal.icon}</Text>
                        <Text style={styles.goalLabel}>{goal.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </>
    );

    const renderStep2 = () => (
        <>
            <Text style={styles.title}>Workout Preferences</Text>
            <Text style={styles.subtitle}>Customize your training intensity and schedule</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('workout.intensity')}</Text>
                <View style={styles.optionsContainer}>
                    {intensityLevels.map((level) => (
                        <TouchableOpacity
                            key={level.value}
                            style={[
                                styles.option,
                                formData.intensity === level.value && styles.optionSelected,
                            ]}
                            onPress={() => setFormData({ ...formData, intensity: level.value })}
                        >
                            <Text style={styles.optionIcon}>{level.icon}</Text>
                            <Text style={styles.optionText}>{level.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('coach.frequency')}</Text>
                <View style={styles.frequencyContainer}>
                    <Text style={styles.frequencyLabel}>Days per week</Text>
                    <View style={styles.frequencyControls}>
                        <TouchableOpacity
                            style={styles.frequencyButton}
                            onPress={() => setFormData({ ...formData, frequency: Math.max(1, formData.frequency - 1) })}
                        >
                            <Text style={styles.frequencyButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.frequencyValue}>{formData.frequency}</Text>
                        <TouchableOpacity
                            style={styles.frequencyButton}
                            onPress={() => setFormData({ ...formData, frequency: Math.min(7, formData.frequency + 1) })}
                        >
                            <Text style={styles.frequencyButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('coach.sessionTime')}</Text>
                <View style={styles.frequencyContainer}>
                    <Text style={styles.frequencyLabel}>Minutes per session</Text>
                    <View style={styles.frequencyControls}>
                        <TouchableOpacity
                            style={styles.frequencyButton}
                            onPress={() => setFormData({ ...formData, sessionTime: Math.max(20, formData.sessionTime - 15) })}
                        >
                            <Text style={styles.frequencyButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.frequencyValue}>{formData.sessionTime}</Text>
                        <TouchableOpacity
                            style={styles.frequencyButton}
                            onPress={() => setFormData({ ...formData, sessionTime: Math.min(120, formData.sessionTime + 15) })}
                        >
                            <Text style={styles.frequencyButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }]}
                scrollEventThrottle={16}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={true}
                bounces={true}
            >
                {/* Step Indicator */}
                <View style={styles.stepIndicator}>
                    <View style={[styles.stepDot, step >= 1 && styles.stepDotActive]} />
                    <View style={[styles.stepDot, step >= 2 && styles.stepDotActive]} />
                </View>

                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
            </ScrollView>

            {/* Fixed Button Container Outside ScrollView */}
            <View style={styles.buttonContainer}>
                {step > 1 && (
                    <Button
                        title={t('common.back')}
                        onPress={() => setStep(step - 1)}
                        variant="outline"
                        style={{ flex: 1 }}
                    />
                )}
                <Button
                    title={step === 2 ? t('common.done') : t('common.next')}
                    onPress={() => {
                        if (step === 2) {
                            handleFinish();
                        } else {
                            setStep(step + 1);
                        }
                    }}
                    style={{ flex: 1 }}
                    disabled={step === 1 && formData.goals.length === 0}
                />
            </View>
        </SafeAreaView>
    );
};
