import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Switch,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

export const SettingsScreen = ({ navigation }) => {
    const { theme, toggleTheme, isDark } = useTheme();
    const { language, changeLanguage, availableLanguages } = useLanguage();
    const { logout } = useAuth();
    const { t } = useTranslation();

    const [notifications, setNotifications] = useState(true);
    const [workoutReminders, setWorkoutReminders] = useState(true);
    const [hydrationReminders, setHydrationReminders] = useState(true);
    const [soundEffects, setSoundEffects] = useState(true);

    const handleClearData = () => {
        Alert.alert(
            'Clear All Data',
            'Are you sure you want to clear all app data? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await AsyncStorage.clear();
                            Alert.alert('Success', 'All data has been cleared. Please restart the app.');
                        } catch (error) {
                            Alert.alert('Error', 'Failed to clear data.');
                        }
                    },
                },
            ]
        );
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: logout,
                },
            ]
        );
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
            paddingBottom: 150,
            flexGrow: 1,
        },
        section: {
            marginBottom: spacing.xl,
        },
        sectionTitle: {
            ...textStyles.h5,
            color: theme.colors.textSecondary,
            marginBottom: spacing.md,
            textTransform: 'uppercase',
            letterSpacing: 1,
        },
        card: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            overflow: 'hidden',
            ...shadows.small,
        },
        settingItem: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: spacing.lg,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
        },
        settingItemLast: {
            borderBottomWidth: 0,
        },
        settingLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
        },
        settingIcon: {
            fontSize: 24,
            marginRight: spacing.md,
        },
        settingContent: {
            flex: 1,
        },
        settingLabel: {
            ...textStyles.body,
            color: theme.colors.text,
        },
        settingDescription: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
            marginTop: 2,
        },
        settingValue: {
            ...textStyles.body,
            color: theme.colors.primary,
        },
        languageOptions: {
            marginTop: spacing.sm,
        },
        languageOption: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: spacing.md,
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.md,
            marginBottom: spacing.xs,
        },
        languageOptionSelected: {
            backgroundColor: theme.colors.primary + '20',
            borderWidth: 2,
            borderColor: theme.colors.primary,
        },
        languageLabel: {
            ...textStyles.body,
            color: theme.colors.text,
        },
        languageCheck: {
            fontSize: 18,
            color: theme.colors.primary,
        },
        dangerButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing.lg,
            backgroundColor: theme.colors.error + '20',
            borderRadius: borderRadius.md,
            marginTop: spacing.md,
        },
        dangerButtonText: {
            ...textStyles.body,
            color: theme.colors.error,
            fontWeight: 'bold',
            marginLeft: spacing.sm,
        },
        version: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            marginTop: spacing.xl,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('profile.settings')}</Text>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }]}
                showsVerticalScrollIndicator={true}
                bounces={true}
            >
                {/* Appearance */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Appearance</Text>
                    <View style={styles.card}>
                        <View style={styles.settingItem}>
                            <View style={styles.settingLeft}>
                                <Text style={styles.settingIcon}>🌙</Text>
                                <View style={styles.settingContent}>
                                    <Text style={styles.settingLabel}>Dark Mode</Text>
                                    <Text style={styles.settingDescription}>Use dark theme</Text>
                                </View>
                            </View>
                            <Switch
                                value={isDark}
                                onValueChange={toggleTheme}
                                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                            />
                        </View>
                    </View>
                </View>

                {/* Language */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Language</Text>
                    <View style={styles.card}>
                        <View style={[styles.settingItem, styles.settingItemLast]}>
                            <View style={styles.settingLeft}>
                                <Text style={styles.settingIcon}>🌐</Text>
                                <View style={styles.settingContent}>
                                    <Text style={styles.settingLabel}>App Language</Text>
                                    <View style={styles.languageOptions}>
                                        {availableLanguages.map((lang) => (
                                            <TouchableOpacity
                                                key={lang.code}
                                                style={[
                                                    styles.languageOption,
                                                    language === lang.code && styles.languageOptionSelected,
                                                ]}
                                                onPress={() => changeLanguage(lang.code)}
                                            >
                                                <Text style={styles.languageLabel}>{lang.flag} {lang.name}</Text>
                                                {language === lang.code && (
                                                    <Text style={styles.languageCheck}>✓</Text>
                                                )}
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Notifications */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notifications</Text>
                    <View style={styles.card}>
                        <View style={styles.settingItem}>
                            <View style={styles.settingLeft}>
                                <Text style={styles.settingIcon}>🔔</Text>
                                <View style={styles.settingContent}>
                                    <Text style={styles.settingLabel}>Push Notifications</Text>
                                    <Text style={styles.settingDescription}>Receive app notifications</Text>
                                </View>
                            </View>
                            <Switch
                                value={notifications}
                                onValueChange={setNotifications}
                                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                            />
                        </View>
                        <View style={styles.settingItem}>
                            <View style={styles.settingLeft}>
                                <Text style={styles.settingIcon}>💪</Text>
                                <View style={styles.settingContent}>
                                    <Text style={styles.settingLabel}>Workout Reminders</Text>
                                    <Text style={styles.settingDescription}>Daily workout reminders</Text>
                                </View>
                            </View>
                            <Switch
                                value={workoutReminders}
                                onValueChange={setWorkoutReminders}
                                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                            />
                        </View>
                        <View style={[styles.settingItem, styles.settingItemLast]}>
                            <View style={styles.settingLeft}>
                                <Text style={styles.settingIcon}>💧</Text>
                                <View style={styles.settingContent}>
                                    <Text style={styles.settingLabel}>Hydration Reminders</Text>
                                    <Text style={styles.settingDescription}>Drink water reminders</Text>
                                </View>
                            </View>
                            <Switch
                                value={hydrationReminders}
                                onValueChange={setHydrationReminders}
                                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                            />
                        </View>
                    </View>
                </View>

                {/* Sound */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sound</Text>
                    <View style={styles.card}>
                        <View style={[styles.settingItem, styles.settingItemLast]}>
                            <View style={styles.settingLeft}>
                                <Text style={styles.settingIcon}>🔊</Text>
                                <View style={styles.settingContent}>
                                    <Text style={styles.settingLabel}>Sound Effects</Text>
                                    <Text style={styles.settingDescription}>Play sounds for actions</Text>
                                </View>
                            </View>
                            <Switch
                                value={soundEffects}
                                onValueChange={setSoundEffects}
                                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                            />
                        </View>
                    </View>
                </View>

                {/* Data & Privacy */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Data & Privacy</Text>
                    <View style={styles.card}>
                        <TouchableOpacity style={[styles.settingItem, styles.settingItemLast]} onPress={handleClearData}>
                            <View style={styles.settingLeft}>
                                <Text style={styles.settingIcon}>🗑️</Text>
                                <View style={styles.settingContent}>
                                    <Text style={[styles.settingLabel, { color: theme.colors.error }]}>Clear All Data</Text>
                                    <Text style={styles.settingDescription}>Delete all stored data</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Logout */}
                <TouchableOpacity style={styles.dangerButton} onPress={handleLogout}>
                    <Text style={{ fontSize: 20 }}>🚪</Text>
                    <Text style={styles.dangerButtonText}>Logout</Text>
                </TouchableOpacity>

                <Text style={styles.version}>GRIT v1.0.0 • Built by Rav3n</Text>
            </ScrollView>
        </SafeAreaView>
    );
};
