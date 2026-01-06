import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    FlatList,
    Switch,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { textStyles } from '../../theme/typography';

export const TopBar = ({ showNotifications = true, showLanguage = true, showTheme = true }) => {
    const { theme, toggleTheme } = useTheme();
    const { languages, currentLanguage, changeLanguage } = useLanguage();
    const [showLanguagePicker, setShowLanguagePicker] = useState(false);
    const [notificationCount, setNotificationCount] = useState(3); // Mock count

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            gap: spacing.md, // Proper spacing between icons
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
            width: '80%',
            maxHeight: '60%',
            ...shadows.large,
        },
        modalTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.md,
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
                <TouchableOpacity style={styles.iconButton} onPress={() => { }}>
                    <Text style={styles.iconText}>🔔</Text>
                    {notificationCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>
                                {notificationCount > 9 ? '9+' : notificationCount}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
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
