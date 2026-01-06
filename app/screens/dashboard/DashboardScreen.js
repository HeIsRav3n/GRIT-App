import React, { useMemo, useCallback } from 'react';
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
import { TopBar } from '../../components/navigation/TopBar';
import { Button } from '../../components/common/Button';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { getQuoteOfTheDay } from '../../data/quotes';
import { useTranslation } from 'react-i18next';

export const DashboardScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { streak, workoutPlan } = useCoach();
    const { t } = useTranslation();
    const quote = getQuoteOfTheDay();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        scrollContent: {
            padding: spacing.lg,
            paddingBottom: spacing.xxl,
        },
        greeting: {
            ...textStyles.h2,
            color: theme.colors.text,
            marginBottom: spacing.xs,
        },
        subGreeting: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
            marginBottom: spacing.xl,
        },
        card: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginBottom: spacing.md,
            ...shadows.medium,
        },
        cardTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.md,
        },
        streakContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            marginBottom: spacing.md,
        },
        streakIcon: {
            fontSize: 40,
            marginRight: spacing.md,
        },
        streakText: {
            flex: 1,
        },
        streakNumber: {
            ...textStyles.h2,
            color: theme.colors.streak,
        },
        streakLabel: {
            ...textStyles.bodySmall,
            color: theme.colors.textSecondary,
        },
        quoteContainer: {
            backgroundColor: theme.colors.backgroundSecondary,
            borderLeftWidth: 4,
            borderLeftColor: theme.colors.primary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            marginBottom: spacing.md,
        },
        quote: {
            ...textStyles.body,
            color: theme.colors.text,
            fontStyle: 'italic',
        },
        quickActionsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: spacing.sm,
            gap: spacing.sm,
        },
        quickAction: {
            flex: 1,
            minWidth: '45%',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            alignItems: 'center',
        },
        quickActionIcon: {
            fontSize: 32,
            marginBottom: spacing.xs,
        },
        quickActionText: {
            ...textStyles.bodySmall,
            color: theme.colors.text,
            textAlign: 'center',
        },
        footer: {
            ...textStyles.caption,
            color: theme.colors.footer,
            textAlign: 'center',
            marginTop: spacing.xl,
            marginBottom: spacing.md,
        },
        workoutSummary: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
            marginBottom: spacing.md,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <TopBar />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                removeClippedSubviews={true}
                scrollEventThrottle={16}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                bounces={true}
                overScrollMode="auto"
            >
                {/* Greeting */}
                <Text style={styles.greeting}>
                    {t('common.welcome', { username: user?.username || 'User' })}
                </Text>
                <Text style={styles.subGreeting}>Let's crush your goals today! 💪</Text>

                {/* Current Streak */}
                <View style={styles.streakContainer}>
                    <Text style={styles.streakIcon}>🔥</Text>
                    <View style={styles.streakText}>
                        <Text style={styles.streakNumber}>{streak?.current || 0}</Text>
                        <Text style={styles.streakLabel}>{t('dashboard.currentStreak')}</Text>
                    </View>
                </View>

                {/* Today's Workout */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{t('dashboard.todaysWorkout')}</Text>
                    {workoutPlan ? (
                        <>
                            <Text style={styles.workoutSummary}>
                                {workoutPlan.schedule?.[0]?.exercises?.length || 0} exercises •
                                {workoutPlan.schedule?.[0]?.duration || 45} min
                            </Text>
                            <Button
                                title={t('dashboard.startWorkout')}
                                onPress={() => navigation.navigate('Workout')}
                            />
                        </>
                    ) : (
                        <>
                            <Text style={styles.workoutSummary}>
                                Set up your AI coach to get a personalized workout plan
                            </Text>
                            <Button
                                title="Setup AI Coach"
                                onPress={() => navigation.navigate('CoachSetup')}
                            />
                        </>
                    )}
                </View>

                {/* Motivational Quote */}
                <View style={styles.quoteContainer}>
                    <Text style={styles.quote}>"{quote}"</Text>
                </View>

                {/* Quick Actions */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{t('dashboard.quickActions')}</Text>
                    <View style={styles.quickActionsContainer}>
                        <TouchableOpacity
                            style={styles.quickAction}
                            onPress={() => navigation.navigate('Hydration')}
                        >
                            <Text style={styles.quickActionIcon}>💧</Text>
                            <Text style={styles.quickActionText}>{t('dashboard.hydration')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.quickAction}
                            onPress={() => navigation.navigate('Chat')}
                        >
                            <Text style={styles.quickActionIcon}>💬</Text>
                            <Text style={styles.quickActionText}>{t('dashboard.chatWithCoach')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.quickAction}
                            onPress={() => navigation.navigate('Progress')}
                        >
                            <Text style={styles.quickActionIcon}>📊</Text>
                            <Text style={styles.quickActionText}>{t('dashboard.viewProgress')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.quickAction}
                            onPress={() => navigation.navigate('Rewards')}
                        >
                            <Text style={styles.quickActionIcon}>🏆</Text>
                            <Text style={styles.quickActionText}>{t('rewards.title')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer */}
                <Text style={styles.footer}>{t('common.builtBy')}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};
