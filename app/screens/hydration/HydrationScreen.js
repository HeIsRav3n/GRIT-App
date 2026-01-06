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
import { TopBar } from '../../components/navigation/TopBar';
import { Button } from '../../components/common/Button';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

export const HydrationScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [dailyGoal, setDailyGoal] = useState(2500); // ml
    const [consumed, setConsumed] = useState(0);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        loadHydrationData();
    }, []);

    const loadHydrationData = async () => {
        try {
            const today = new Date().toDateString();
            const data = await AsyncStorage.getItem(`hydration_${today}`);
            if (data) {
                const parsed = JSON.parse(data);
                setConsumed(parsed.consumed || 0);
                setLogs(parsed.logs || []);
            }
        } catch (error) {
            console.log('Error loading hydration data:', error);
        }
    };

    const saveHydrationData = async (newConsumed, newLogs) => {
        try {
            const today = new Date().toDateString();
            await AsyncStorage.setItem(`hydration_${today}`, JSON.stringify({
                consumed: newConsumed,
                logs: newLogs,
                goal: dailyGoal,
            }));
        } catch (error) {
            console.log('Error saving hydration data:', error);
        }
    };

    const addWater = (amount) => {
        const newConsumed = consumed + amount;
        const newLogs = [...logs, { amount, time: new Date().toLocaleTimeString() }];
        setConsumed(newConsumed);
        setLogs(newLogs);
        saveHydrationData(newConsumed, newLogs);
    };

    const resetDay = () => {
        setConsumed(0);
        setLogs([]);
        saveHydrationData(0, []);
    };

    const progress = Math.min((consumed / dailyGoal) * 100, 100);
    const remaining = Math.max(dailyGoal - consumed, 0);

    const waterAmounts = [
        { amount: 100, label: '100ml', icon: '💧' },
        { amount: 250, label: '250ml', icon: '🥤' },
        { amount: 500, label: '500ml', icon: '🍶' },
        { amount: 750, label: '750ml', icon: '🫗' },
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
            paddingBottom: spacing.xxl,
        },
        progressCard: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.xl,
            alignItems: 'center',
            marginBottom: spacing.lg,
            ...shadows.medium,
        },
        progressIcon: {
            fontSize: 64,
            marginBottom: spacing.md,
        },
        progressRing: {
            width: 180,
            height: 180,
            borderRadius: 90,
            borderWidth: 12,
            borderColor: theme.colors.border,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.lg,
            position: 'relative',
        },
        progressFill: {
            position: 'absolute',
            width: 180,
            height: 180,
            borderRadius: 90,
            borderWidth: 12,
            borderColor: theme.colors.primary,
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
        },
        progressText: {
            fontSize: 36,
            fontWeight: 'bold',
            color: theme.colors.primary,
        },
        progressSubtext: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
        },
        statsRow: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginTop: spacing.lg,
        },
        statItem: {
            alignItems: 'center',
        },
        statValue: {
            ...textStyles.h4,
            color: theme.colors.text,
            fontWeight: 'bold',
        },
        statLabel: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
        },
        addWaterCard: {
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
        amountsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: spacing.sm,
        },
        amountButton: {
            flex: 1,
            minWidth: '45%',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            alignItems: 'center',
            borderWidth: 2,
            borderColor: 'transparent',
        },
        amountIcon: {
            fontSize: 32,
            marginBottom: spacing.xs,
        },
        amountLabel: {
            ...textStyles.body,
            color: theme.colors.text,
            fontWeight: 'bold',
        },
        logsCard: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginBottom: spacing.lg,
            ...shadows.medium,
        },
        logItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: spacing.sm,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
        },
        logText: {
            ...textStyles.body,
            color: theme.colors.text,
        },
        logTime: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
        },
        emptyLogs: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            padding: spacing.lg,
        },
        resetButton: {
            marginTop: spacing.md,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('hydration.title')}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Progress Card */}
                <View style={styles.progressCard}>
                    <Text style={styles.progressIcon}>💧</Text>
                    <View style={styles.progressRing}>
                        <Text style={styles.progressText}>{Math.round(progress)}%</Text>
                        <Text style={styles.progressSubtext}>of daily goal</Text>
                    </View>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{consumed}ml</Text>
                            <Text style={styles.statLabel}>{t('hydration.consumed')}</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{remaining}ml</Text>
                            <Text style={styles.statLabel}>{t('hydration.remaining')}</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{dailyGoal}ml</Text>
                            <Text style={styles.statLabel}>{t('hydration.dailyTarget')}</Text>
                        </View>
                    </View>
                </View>

                {/* Add Water */}
                <View style={styles.addWaterCard}>
                    <Text style={styles.sectionTitle}>{t('hydration.logWater')}</Text>
                    <View style={styles.amountsGrid}>
                        {waterAmounts.map((item) => (
                            <TouchableOpacity
                                key={item.amount}
                                style={styles.amountButton}
                                onPress={() => addWater(item.amount)}
                            >
                                <Text style={styles.amountIcon}>{item.icon}</Text>
                                <Text style={styles.amountLabel}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Today's Logs */}
                <View style={styles.logsCard}>
                    <Text style={styles.sectionTitle}>Today's Intake</Text>
                    {logs.length > 0 ? (
                        logs.slice().reverse().map((log, index) => (
                            <View key={index} style={styles.logItem}>
                                <Text style={styles.logText}>💧 {log.amount}ml</Text>
                                <Text style={styles.logTime}>{log.time}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptyLogs}>No water logged yet today. Stay hydrated! 💪</Text>
                    )}
                </View>

                <Button
                    title="Reset Today's Progress"
                    onPress={resetDay}
                    variant="outline"
                    style={styles.resetButton}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
