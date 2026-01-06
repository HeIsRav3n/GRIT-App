import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { TopBar } from '../../components/navigation/TopBar';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

export const ChatHubScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { t } = useTranslation();

    const chatOptions = [
        {
            id: 'ai-coach',
            title: '🤖 AI Fitness Coach',
            subtitle: 'Get personalized workout advice, tips, and motivation',
            icon: '💪',
            color: theme.colors.primary,
            screen: 'ChatHome',
        },
        {
            id: 'friends',
            title: '👥 Friends & Groups',
            subtitle: 'Chat with friends and create workout groups',
            icon: '💬',
            color: theme.colors.success,
            screen: 'FriendsList',
        },
    ];

    const recentChats = [
        { id: '1', name: 'Alex Johnson', avatar: '🏋️', lastMessage: 'Great workout today!', time: '2m' },
        { id: '2', name: 'Morning Crew', avatar: '🌅', lastMessage: 'Who\'s ready for 6am?', time: '1h', isGroup: true },
        { id: '3', name: 'Sarah Miller', avatar: '🧘', lastMessage: 'See you tomorrow', time: '3h' },
    ];

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        scrollContent: {
            padding: spacing.lg,
            paddingBottom: 150,
            flexGrow: 1,
        },
        title: {
            ...textStyles.h2,
            color: theme.colors.text,
            marginBottom: spacing.lg,
        },
        optionCard: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.xl,
            marginBottom: spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
            ...shadows.medium,
            borderLeftWidth: 4,
        },
        optionIcon: {
            fontSize: 40,
            marginRight: spacing.lg,
        },
        optionContent: {
            flex: 1,
        },
        optionTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
        },
        optionSubtitle: {
            ...textStyles.bodySmall,
            color: theme.colors.textSecondary,
            marginTop: 4,
        },
        optionArrow: {
            fontSize: 24,
            color: theme.colors.textTertiary,
        },
        sectionTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginTop: spacing.xl,
            marginBottom: spacing.md,
        },
        recentItem: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            marginBottom: spacing.sm,
            ...shadows.small,
        },
        recentAvatar: {
            width: 45,
            height: 45,
            borderRadius: 23,
            backgroundColor: theme.colors.backgroundSecondary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.md,
        },
        recentAvatarText: {
            fontSize: 20,
        },
        recentContent: {
            flex: 1,
        },
        recentName: {
            ...textStyles.body,
            color: theme.colors.text,
            fontWeight: 'bold',
        },
        recentMessage: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
        },
        recentTime: {
            ...textStyles.caption,
            color: theme.colors.textTertiary,
        },
        groupBadge: {
            ...textStyles.tiny,
            color: theme.colors.primary,
            fontWeight: 'bold',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <TopBar />
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
                <Text style={styles.title}>{t('chat.title')}</Text>

                {/* Main Options */}
                {chatOptions.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={[styles.optionCard, { borderLeftColor: option.color }]}
                        onPress={() => navigation.navigate(option.screen)}
                    >
                        <Text style={styles.optionIcon}>{option.icon}</Text>
                        <View style={styles.optionContent}>
                            <Text style={styles.optionTitle}>{option.title}</Text>
                            <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                        </View>
                        <Text style={styles.optionArrow}>→</Text>
                    </TouchableOpacity>
                ))}

                {/* Recent Chats */}
                <Text style={styles.sectionTitle}>Recent</Text>
                {recentChats.map((chat) => (
                    <TouchableOpacity
                        key={chat.id}
                        style={styles.recentItem}
                        onPress={() => navigation.navigate(chat.isGroup ? 'GroupChat' : 'FriendChat', {
                            friend: { id: chat.id, name: chat.name, avatar: chat.avatar, status: 'online' },
                            group: { id: chat.id, name: chat.name, icon: chat.avatar, members: 4 }
                        })}
                    >
                        <View style={styles.recentAvatar}>
                            <Text style={styles.recentAvatarText}>{chat.avatar}</Text>
                        </View>
                        <View style={styles.recentContent}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                                <Text style={styles.recentName}>{chat.name}</Text>
                                {chat.isGroup && <Text style={styles.groupBadge}>GROUP</Text>}
                            </View>
                            <Text style={styles.recentMessage} numberOfLines={1}>{chat.lastMessage}</Text>
                        </View>
                        <Text style={styles.recentTime}>{chat.time}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};
