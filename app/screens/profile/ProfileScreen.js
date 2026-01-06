import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { TopBar } from '../../components/navigation/TopBar';
import { Button } from '../../components/common/Button';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';
import { isValidImageUri } from '../../utils/imageUtils';

export const ProfileScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { user, logout } = useAuth();
    const { t } = useTranslation();
    const [imageError, setImageError] = useState(false);

    const profileSections = [
        {
            title: 'Personal Info',
            items: [
                { label: t('profile.gender'), value: user?.gender || 'Not set', icon: '⚧' },
                { label: t('profile.age'), value: user?.age ? `${user.age} years` : 'Not set', icon: '🎂' },
                { label: t('profile.height'), value: user?.height ? `${user.height} cm` : 'Not set', icon: '📏' },
                { label: t('profile.weight'), value: user?.weight ? `${user.weight} kg` : 'Not set', icon: '⚖️' },
            ],
        },
        {
            title: 'Fitness',
            items: [
                { label: t('profile.fitnessLevel'), value: user?.fitnessLevel || 'Not set', icon: '💪' },
                { label: t('profile.goals'), value: 'View Goals', icon: '🎯', action: () => navigation.navigate('Goals') },
            ],
        },
    ];

    const menuItems = [
        { label: 'QR Code', icon: '📱', action: () => navigation.navigate('QRCode') },
        { label: t('health.title'), icon: '❤️', action: () => navigation.navigate('Health') },
        { label: '🎵 Music Hub', icon: '🎧', action: () => navigation.navigate('MusicHub') },
        { label: t('profile.settings'), icon: '⚙️', action: () => navigation.navigate('Settings') },
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
        profileHeader: {
            alignItems: 'center',
            marginBottom: spacing.xl,
        },
        profilePicture: {
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: theme.colors.backgroundSecondary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.md,
            ...shadows.medium,
        },
        profileImage: {
            width: 100,
            height: 100,
            borderRadius: 50,
        },
        profilePlaceholder: {
            fontSize: 48,
        },
        username: {
            ...textStyles.h2,
            color: theme.colors.text,
            marginBottom: spacing.xs,
        },
        email: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
        },
        editButton: {
            marginTop: spacing.md,
        },
        section: {
            marginBottom: spacing.lg,
        },
        sectionTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.md,
        },
        card: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            ...shadows.small,
        },
        infoRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
        },
        infoRowLast: {
            borderBottomWidth: 0,
        },
        infoIcon: {
            fontSize: 24,
            marginRight: spacing.md,
            width: 32,
        },
        infoContent: {
            flex: 1,
        },
        infoLabel: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
            marginBottom: 2,
        },
        infoValue: {
            ...textStyles.body,
            color: theme.colors.text,
            fontWeight: '500',
        },
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            marginBottom: spacing.sm,
            ...shadows.small,
        },
        menuIcon: {
            fontSize: 24,
            marginRight: spacing.md,
            width: 32,
        },
        menuLabel: {
            ...textStyles.body,
            color: theme.colors.text,
            flex: 1,
        },
        menuArrow: {
            ...textStyles.h4,
            color: theme.colors.textTertiary,
        },
        logoutButton: {
            marginTop: spacing.lg,
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
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.profilePicture}>
                        {user?.profilePicture && isValidImageUri(user.profilePicture) && !imageError ? (
                            <Image
                                source={{ uri: user.profilePicture }}
                                style={styles.profileImage}
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <Text style={styles.profilePlaceholder}>👤</Text>
                        )}
                    </View>
                    <Text style={styles.username}>{user?.username || 'User'}</Text>
                    <Text style={styles.email}>{user?.email || user?.phone || 'No contact info'}</Text>
                    <Button
                        title={t('profile.editProfile')}
                        onPress={() => navigation.navigate('EditProfile')}
                        variant="outline"
                        size="small"
                        style={styles.editButton}
                    />
                </View>

                {/* Profile Sections */}
                {profileSections.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.card}>
                            {section.items.map((item, itemIndex) => (
                                <TouchableOpacity
                                    key={itemIndex}
                                    style={[
                                        styles.infoRow,
                                        itemIndex === section.items.length - 1 && styles.infoRowLast,
                                    ]}
                                    onPress={item.action}
                                    disabled={!item.action}
                                >
                                    <Text style={styles.infoIcon}>{item.icon}</Text>
                                    <View style={styles.infoContent}>
                                        <Text style={styles.infoLabel}>{item.label}</Text>
                                        <Text style={styles.infoValue}>{item.value}</Text>
                                    </View>
                                    {item.action && <Text style={styles.menuArrow}>›</Text>}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                {/* Menu Items */}
                <View style={styles.section}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={item.action}
                        >
                            <Text style={styles.menuIcon}>{item.icon}</Text>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <Text style={styles.menuArrow}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <Button
                    title={t('auth.logout')}
                    onPress={logout}
                    variant="outline"
                    style={styles.logoutButton}
                />

                {/* Footer */}
                <Text style={styles.footer}>{t('common.builtBy')}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};
