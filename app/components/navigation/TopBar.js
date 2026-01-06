import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    FlatList,
    Switch,
    ScrollView,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { textStyles } from '../../theme/typography';

export const TopBar = ({ showNotifications = true, showLanguage = true, showTheme = true }) => {
    const { theme, toggleTheme } = useTheme();
    const { languages, currentLanguage, changeLanguage } = useLanguage();
    const [showLanguagePicker, setShowLanguagePicker] = useState(false);
    const [showNotificationModal, setShowNotificationModal] = useState(false);

    const [notifications, setNotifications] = useState([
        { id: '1', title: '🔥 Streak Alert!', message: 'You\'re on a 7-day streak! Keep it up!', time: '2m ago', unread: true },
        { id: '2', title: '💪 Workout Complete', message: 'Great job finishing your HIIT session!', time: '1h ago', unread: true },
        { id: '3', title: '🎯 Goal Progress', message: 'You\'re 80% towards your weekly goal!', time: '3h ago', unread: true },
        { id: '4', title: '👥 Friend Request', message: 'Alex wants to add you as a friend', time: '1d ago', unread: false },
        { id: '5', title: '🏆 Achievement Unlocked', message: 'First Week Champion badge earned!', time: '2d ago', unread: false },
    ]);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    const clearNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const unreadCount = notifications.filter(n => n.unread).length;

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            gap: spacing.md,
        },
        iconButton: {
            padding: spacing.sm,
            borderRadius: borderRadius.md,
            position: 'relative',
        },
        badge: {
            position: 'absolute',
            top: 4,
            right: 4,
            backgroundColor: theme.colors.error,
            borderRadius: borderRadius.round,
            minWidth: 18,
            height: 18,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 4,
        },
        badgeText: {
            ...textStyles.tiny,
            color: '#FFFFFF',
            fontWeight: 'bold',
        },
        iconText: {
            fontSize: 20,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: theme.colors.overlay,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            width: '90%',
            maxHeight: '70%',
            ...shadows.large,
        },
        modalHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.md,
            paddingBottom: spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
        },
        modalTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
        },
        markReadButton: {
            paddingHorizontal: spacing.sm,
            paddingVertical: spacing.xs,
        },
        markReadText: {
            ...textStyles.caption,
            color: theme.colors.primary,
            fontWeight: 'bold',
        },
        notificationItem: {
            flexDirection: 'row',
            paddingVertical: spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
        },
        notificationUnread: {
            backgroundColor: theme.colors.primary + '10',
            marginHorizontal: -spacing.lg,
            paddingHorizontal: spacing.lg,
        },
        notificationDot: {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: theme.colors.primary,
            marginRight: spacing.sm,
            marginTop: 6,
        },
        notificationContent: {
            flex: 1,
        },
        notificationTitle: {
            ...textStyles.body,
            color: theme.colors.text,
            fontWeight: 'bold',
        },
        notificationMessage: {
            ...textStyles.bodySmall,
            color: theme.colors.textSecondary,
            marginTop: 2,
        },
        notificationTime: {
            ...textStyles.caption,
            color: theme.colors.textTertiary,
            marginTop: 4,
        },
        dismissButton: {
            padding: spacing.xs,
        },
        dismissText: {
            fontSize: 16,
            color: theme.colors.textTertiary,
        },
        emptyNotifications: {
            alignItems: 'center',
            paddingVertical: spacing.xl,
        },
        emptyIcon: {
            fontSize: 48,
            marginBottom: spacing.md,
        },
        emptyText: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
        },
        languageItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
        },
        languageFlag: {
            fontSize: 24,
            marginRight: spacing.md,
        },
        languageName: {
            ...textStyles.body,
            color: theme.colors.text,
            flex: 1,
        },
        selectedIndicator: {
            color: theme.colors.primary,
            fontSize: 20,
        },
        themeToggleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    });

    const currentLang = languages.find((lang) => lang.code === currentLanguage);

    return (
        <View style={styles.container}>
            {/* Language Picker */}
            {showLanguage && (
                <>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => setShowLanguagePicker(true)}
                    >
                        <Text style={styles.iconText}>{currentLang?.flag || '🌐'}</Text>
                    </TouchableOpacity>

                    <Modal
                        visible={showLanguagePicker}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setShowLanguagePicker(false)}
                    >
                        <TouchableOpacity
                            style={styles.modalOverlay}
                            activeOpacity={1}
                            onPress={() => setShowLanguagePicker(false)}
                        >
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Select Language</Text>
                                <FlatList
                                    data={languages}
                                    keyExtractor={(item) => item.code}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.languageItem}
                                            onPress={() => {
                                                changeLanguage(item.code);
                                                setShowLanguagePicker(false);
                                            }}
                                        >
                                            <Text style={styles.languageFlag}>{item.flag}</Text>
                                            <Text style={styles.languageName}>{item.name}</Text>
                                            {item.code === currentLanguage && (
                                                <Text style={styles.selectedIndicator}>✓</Text>
                                            )}
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </>
            )}

            {/* Notifications Bell */}
            {showNotifications && (
                <>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => setShowNotificationModal(true)}
                    >
                        <Text style={styles.iconText}>🔔</Text>
                        {unreadCount > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <Modal
                        visible={showNotificationModal}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setShowNotificationModal(false)}
                    >
                        <TouchableOpacity
                            style={styles.modalOverlay}
                            activeOpacity={1}
                            onPress={() => setShowNotificationModal(false)}
                        >
                            <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>🔔 Notifications</Text>
                                    {unreadCount > 0 && (
                                        <TouchableOpacity style={styles.markReadButton} onPress={markAllRead}>
                                            <Text style={styles.markReadText}>Mark all read</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {notifications.length === 0 ? (
                                        <View style={styles.emptyNotifications}>
                                            <Text style={styles.emptyIcon}>🔔</Text>
                                            <Text style={styles.emptyText}>No notifications yet</Text>
                                        </View>
                                    ) : (
                                        notifications.map((notification) => (
                                            <View
                                                key={notification.id}
                                                style={[
                                                    styles.notificationItem,
                                                    notification.unread && styles.notificationUnread
                                                ]}
                                            >
                                                {notification.unread && <View style={styles.notificationDot} />}
                                                <View style={styles.notificationContent}>
                                                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                                                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                                                    <Text style={styles.notificationTime}>{notification.time}</Text>
                                                </View>
                                                <TouchableOpacity
                                                    style={styles.dismissButton}
                                                    onPress={() => clearNotification(notification.id)}
                                                >
                                                    <Text style={styles.dismissText}>✕</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ))
                                    )}
                                </ScrollView>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </>
            )}

            {/* Theme Toggle */}
            {showTheme && (
                <View style={styles.themeToggleContainer}>
                    <Switch
                        value={theme.isDark}
                        onValueChange={toggleTheme}
                        trackColor={{
                            false: theme.colors.border,
                            true: theme.colors.primary,
                        }}
                        thumbColor="#FFFFFF"
                    />
                </View>
            )}
        </View>
    );
};
