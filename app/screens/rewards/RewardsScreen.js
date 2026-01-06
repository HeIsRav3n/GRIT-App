import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useCoach } from '../../contexts/CoachContext';
import { TopBar } from '../../components/navigation/TopBar';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

export const RewardsScreen = () => {
    const { theme } = useTheme();
    const { streak } = useCoach();
    const { t } = useTranslation();

    // Generate calendar for current month
    const generateCalendar = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const calendar = [];
        let week = new Array(7).fill(null);

        // Fill in the days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayOfWeek = (startingDayOfWeek + day - 1) % 7;
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isCheckedIn = streak?.checkInDates?.includes(dateString);
            const isToday = day === today.getDate();

            week[dayOfWeek] = {
                day,
                isCheckedIn,
                isToday,
            };

            if (dayOfWeek === 6 || day === daysInMonth) {
                calendar.push([...week]);
                week = new Array(7).fill(null);
            }
        }

        return calendar;
    };

    const calendar = generateCalendar();
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const milestones = [
        { days: 7, label: '7 Day Streak', icon: '🔥', achieved: (streak?.current || 0) >= 7 },
        { days: 14, label: '2 Week Warrior', icon: '💪', achieved: (streak?.current || 0) >= 14 },
        { days: 30, label: '1 Month Champion', icon: '🏆', achieved: (streak?.current || 0) >= 30 },
        { days: 60, label: '2 Month Legend', icon: '👑', achieved: (streak?.current || 0) >= 60 },
    ];

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
            marginBottom: spacing.xl,
        },
        streakCard: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.xl,
            marginBottom: spacing.lg,
            alignItems: 'center',
            ...shadows.large,
        },
        streakIcon: {
            fontSize: 64,
            marginBottom: spacing.md,
        },
        streakNumber: {
            fontSize: 48,
            fontWeight: 'bold',
            color: theme.colors.primary,
            marginBottom: spacing.xs,
        },
        streakLabel: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.sm,
        },
        longestStreak: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
        },
        calendarCard: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.md,
            marginBottom: spacing.lg,
            maxWidth: 400,
            alignSelf: 'center',
            width: '100%',
            ...shadows.medium,
        },
        calendarTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.sm,
        },
        calendarHeader: {
            flexDirection: 'row',
            marginBottom: spacing.sm,
        },
        weekDay: {
            flex: 1,
            ...textStyles.bodySmall,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        calendarWeek: {
            flexDirection: 'row',
            marginBottom: spacing.xs,
        },
        calendarDay: {
            flex: 1,
            aspectRatio: 1,
            maxWidth: 40,
            maxHeight: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: borderRadius.sm,
        },
        dayText: {
            ...textStyles.body,
            color: theme.colors.text,
        },
        checkedInDay: {
            backgroundColor: theme.colors.success + '30',
            borderWidth: 2,
            borderColor: theme.colors.success,
        },
        checkedInDayText: {
            color: theme.colors.success,
            fontWeight: 'bold',
        },
        todayDay: {
            borderWidth: 2,
            borderColor: theme.colors.primary,
        },
        todayDayText: {
            color: theme.colors.primary,
            fontWeight: 'bold',
        },
        milestonesCard: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginBottom: spacing.lg,
            ...shadows.medium,
        },
        milestonesTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.md,
        },
        milestoneItem: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            marginBottom: spacing.sm,
        },
        milestoneItemAchieved: {
            backgroundColor: theme.colors.success + '20',
            borderWidth: 2,
            borderColor: theme.colors.success,
        },
        milestoneIcon: {
            fontSize: 32,
            marginRight: spacing.md,
        },
        milestoneContent: {
            flex: 1,
        },
        milestoneLabel: {
            ...textStyles.body,
            color: theme.colors.text,
            fontWeight: 'bold',
        },
        milestoneDays: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
        },
        achievedBadge: {
            backgroundColor: theme.colors.success,
            borderRadius: borderRadius.round,
            paddingHorizontal: spacing.sm,
            paddingVertical: 4,
        },
        achievedText: {
            ...textStyles.caption,
            color: '#FFFFFF',
            fontWeight: 'bold',
        },
        footer: {
            ...textStyles.caption,
            color: theme.colors.footer,
            textAlign: 'center',
            marginTop: spacing.xl,
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
            >
                <Text style={styles.title}>{t('rewards.title')}</Text>

                {/* Current Streak */}
                <View style={styles.streakCard}>
                    <Text style={styles.streakIcon}>🔥</Text>
                    <Text style={styles.streakNumber}>{streak?.current || 0}</Text>
                    <Text style={styles.streakLabel}>{t('rewards.currentStreak')}</Text>
                    <Text style={styles.longestStreak}>
                        {t('rewards.longestStreak')}: {streak?.longest || 0} days
                    </Text>
                </View>

                {/* Calendar */}
                <View style={styles.calendarCard}>
                    <Text style={styles.calendarTitle}>{t('rewards.streakCalendar')}</Text>

                    {/* Week Days Header */}
                    <View style={styles.calendarHeader}>
                        {weekDays.map((day, index) => (
                            <Text key={index} style={styles.weekDay}>
                                {day}
                            </Text>
                        ))}
                    </View>

                    {/* Calendar Grid */}
                    {calendar.map((week, weekIndex) => (
                        <View key={weekIndex} style={styles.calendarWeek}>
                            {week.map((day, dayIndex) => (
                                <View
                                    key={dayIndex}
                                    style={[
                                        styles.calendarDay,
                                        day?.isCheckedIn && styles.checkedInDay,
                                        day?.isToday && styles.todayDay,
                                    ]}
                                >
                                    {day && (
                                        <Text
                                            style={[
                                                styles.dayText,
                                                day.isCheckedIn && styles.checkedInDayText,
                                                day.isToday && styles.todayDayText,
                                            ]}
                                        >
                                            {day.day}
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    ))}
                </View>

                {/* Milestones */}
                <View style={styles.milestonesCard}>
                    <Text style={styles.milestonesTitle}>{t('rewards.milestones')}</Text>
                    {milestones.map((milestone, index) => (
                        <View
                            key={index}
                            style={[
                                styles.milestoneItem,
                                milestone.achieved && styles.milestoneItemAchieved,
                            ]}
                        >
                            <Text style={styles.milestoneIcon}>{milestone.icon}</Text>
                            <View style={styles.milestoneContent}>
                                <Text style={styles.milestoneLabel}>{milestone.label}</Text>
                                <Text style={styles.milestoneDays}>{milestone.days} days</Text>
                            </View>
                            {milestone.achieved && (
                                <View style={styles.achievedBadge}>
                                    <Text style={styles.achievedText}>✓ Achieved</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                {/* Footer */}
                <Text style={styles.footer}>{t('common.builtBy')}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};
