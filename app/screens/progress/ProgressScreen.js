import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useCoach } from '../../contexts/CoachContext';
import { TopBar } from '../../components/navigation/TopBar';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

export const ProgressScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { progress, streak } = useCoach();
    const { t } = useTranslation();

    // Sample data - in production, this would come from the CoachContext
    const weeklyData = [
        { day: 'Mon', workouts: 1, calories: 450 },
        { day: 'Tue', workouts: 1, calories: 520 },
        { day: 'Wed', workouts: 0, calories: 0 },
        { day: 'Thu', workouts: 1, calories: 380 },
        { day: 'Fri', workouts: 1, calories: 600 },
        { day: 'Sat', workouts: 0, calories: 0 },
        { day: 'Sun', workouts: 1, calories: 420 },
    ];

    const totalWorkouts = weeklyData.reduce((sum, d) => sum + d.workouts, 0);
    const totalCalories = weeklyData.reduce((sum, d) => sum + d.calories, 0);
    const maxCalories = Math.max(...weeklyData.map(d => d.calories), 1);

    const bodyMetrics = {
        weight: { current: 75, start: 80, goal: 70, unit: 'kg' },
        bodyFat: { current: 18, start: 22, goal: 15, unit: '%' },
        muscle: { current: 42, start: 38, goal: 45, unit: 'kg' },
    };

    const achievements = [
        { icon: '🔥', title: '7-Day Streak', unlocked: (streak?.current || 0) >= 7 },
        { icon: '💪', title: '10 Workouts', unlocked: totalWorkouts >= 10 },
        { icon: '🏃', title: 'First Cardio', unlocked: true },
        { icon: '🎯', title: 'Goal Setter', unlocked: true },
        { icon: '⭐', title: '30-Day Warrior', unlocked: (streak?.current || 0) >= 30 },
        { icon: '🏆', title: 'Champion', unlocked: false },
    ];

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
            paddingBottom: 150,
            flexGrow: 1,
        },
        card: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginBottom: spacing.lg,
            ...shadows.medium,
        },
        sectionTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.md,
        },
        statsRow: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: spacing.lg,
        },
        statItem: {
            alignItems: 'center',
        },
        statIcon: {
            fontSize: 32,
            marginBottom: spacing.xs,
        },
        statValue: {
            ...textStyles.h3,
            color: theme.colors.primary,
            fontWeight: 'bold',
        },
        statLabel: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
        },
        chartContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            height: 120,
            marginTop: spacing.md,
        },
        barContainer: {
            alignItems: 'center',
            flex: 1,
        },
        bar: {
            width: 24,
            borderRadius: borderRadius.sm,
            marginBottom: spacing.xs,
        },
        barLabel: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
        },
        metricRow: {
            marginBottom: spacing.md,
        },
        metricHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: spacing.xs,
        },
        metricLabel: {
            ...textStyles.body,
            color: theme.colors.text,
        },
        metricValue: {
            ...textStyles.body,
            color: theme.colors.primary,
            fontWeight: 'bold',
        },
        progressBar: {
            height: 8,
            backgroundColor: theme.colors.border,
            borderRadius: borderRadius.round,
            overflow: 'hidden',
        },
        progressFill: {
            height: '100%',
            backgroundColor: theme.colors.primary,
            borderRadius: borderRadius.round,
        },
        metricDetails: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: spacing.xs,
        },
        metricDetail: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
        },
        achievementsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: spacing.sm,
        },
        achievementItem: {
            width: '30%',
            aspectRatio: 1,
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.md,
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing.sm,
        },
        achievementUnlocked: {
            backgroundColor: theme.colors.primary + '20',
            borderWidth: 2,
            borderColor: theme.colors.primary,
        },
        achievementLocked: {
            opacity: 0.4,
        },
        achievementIcon: {
            fontSize: 28,
            marginBottom: spacing.xs,
        },
        achievementTitle: {
            ...textStyles.caption,
            color: theme.colors.text,
            textAlign: 'center',
        },
    });

    const getProgressPercent = (current, start, goal) => {
        const totalChange = Math.abs(goal - start);
        const currentChange = Math.abs(current - start);
        return Math.min((currentChange / totalChange) * 100, 100);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('progress.title')}</Text>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }]}
                showsVerticalScrollIndicator={true}
                bounces={true}
            >
                {/* Weekly Summary */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>{t('progress.weeklyComparison')}</Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statIcon}>🏋️</Text>
                            <Text style={styles.statValue}>{totalWorkouts}</Text>
                            <Text style={styles.statLabel}>Workouts</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statIcon}>🔥</Text>
                            <Text style={styles.statValue}>{totalCalories}</Text>
                            <Text style={styles.statLabel}>Calories</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statIcon}>📈</Text>
                            <Text style={styles.statValue}>{streak?.current || 0}</Text>
                            <Text style={styles.statLabel}>Streak</Text>
                        </View>
                    </View>

                    {/* Bar Chart */}
                    <View style={styles.chartContainer}>
                        {weeklyData.map((day, index) => (
                            <View key={index} style={styles.barContainer}>
                                <View
                                    style={[
                                        styles.bar,
                                        {
                                            height: Math.max((day.calories / maxCalories) * 80, 4),
                                            backgroundColor: day.workouts > 0 ? theme.colors.primary : theme.colors.border,
                                        },
                                    ]}
                                />
                                <Text style={styles.barLabel}>{day.day}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Body Metrics */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>{t('progress.weightProgress')}</Text>

                    {Object.entries(bodyMetrics).map(([key, metric]) => (
                        <View key={key} style={styles.metricRow}>
                            <View style={styles.metricHeader}>
                                <Text style={styles.metricLabel}>
                                    {key === 'weight' ? 'Weight' : key === 'bodyFat' ? 'Body Fat' : 'Muscle Mass'}
                                </Text>
                                <Text style={styles.metricValue}>
                                    {metric.current}{metric.unit}
                                </Text>
                            </View>
                            <View style={styles.progressBar}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${getProgressPercent(metric.current, metric.start, metric.goal)}%` },
                                    ]}
                                />
                            </View>
                            <View style={styles.metricDetails}>
                                <Text style={styles.metricDetail}>Start: {metric.start}{metric.unit}</Text>
                                <Text style={styles.metricDetail}>Goal: {metric.goal}{metric.unit}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Achievements */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>{t('rewards.achievements')}</Text>
                    <View style={styles.achievementsGrid}>
                        {achievements.map((achievement, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.achievementItem,
                                    achievement.unlocked ? styles.achievementUnlocked : styles.achievementLocked,
                                ]}
                            >
                                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
