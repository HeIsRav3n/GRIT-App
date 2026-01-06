import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

export const FriendsListScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [friends, setFriends] = useState([]);
    const [groups, setGroups] = useState([]);

    // Sample friends data - would come from backend
    const sampleFriends = [
        { id: '1', name: 'Alex Johnson', avatar: '🏋️', status: 'online', lastMessage: 'Great workout today!', unread: 2 },
        { id: '2', name: 'Sarah Miller', avatar: '🧘', status: 'offline', lastMessage: 'See you tomorrow', unread: 0 },
        { id: '3', name: 'Mike Chen', avatar: '🏃', status: 'online', lastMessage: 'What time is gym?', unread: 1 },
        { id: '4', name: 'Emma Wilson', avatar: '💪', status: 'away', lastMessage: 'Thanks for the tips!', unread: 0 },
        { id: '5', name: 'James Brown', avatar: '🚴', status: 'online', lastMessage: 'New PR today!', unread: 0 },
    ];

    const sampleGroups = [
        { id: 'g1', name: 'Morning Crew', icon: '🌅', members: 4, lastMessage: 'Who\'s ready for 6am?', unread: 3 },
        { id: 'g2', name: 'HIIT Squad', icon: '🔥', members: 6, lastMessage: 'Class starts in 1 hour', unread: 0 },
    ];

    useEffect(() => {
        loadFriendsData();
    }, []);

    const loadFriendsData = async () => {
        try {
            const data = await AsyncStorage.getItem('friendsData');
            if (data) {
                const parsed = JSON.parse(data);
                setFriends(parsed.friends || sampleFriends);
                setGroups(parsed.groups || sampleGroups);
            } else {
                setFriends(sampleFriends);
                setGroups(sampleGroups);
            }
        } catch (error) {
            setFriends(sampleFriends);
            setGroups(sampleGroups);
        }
    };

    const filteredFriends = friends.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        addButton: {
            padding: spacing.sm,
        },
        addButtonText: {
            fontSize: 24,
        },
        scrollContent: {
            padding: spacing.lg,
            paddingBottom: 150,
            flexGrow: 1,
        },
        searchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.lg,
            paddingHorizontal: spacing.md,
            marginBottom: spacing.lg,
        },
        searchIcon: {
            fontSize: 16,
            marginRight: spacing.sm,
        },
        searchInput: {
            flex: 1,
            ...textStyles.body,
            color: theme.colors.text,
            paddingVertical: spacing.md,
        },
        sectionTitle: {
            ...textStyles.h5,
            color: theme.colors.textSecondary,
            marginBottom: spacing.md,
            marginTop: spacing.md,
            textTransform: 'uppercase',
        },
        groupsRow: {
            flexDirection: 'row',
            gap: spacing.md,
            marginBottom: spacing.lg,
        },
        groupCard: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.md,
            alignItems: 'center',
            minWidth: 100,
            ...shadows.small,
        },
        groupIcon: {
            fontSize: 32,
            marginBottom: spacing.xs,
        },
        groupName: {
            ...textStyles.bodySmall,
            color: theme.colors.text,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        groupMembers: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
        },
        groupUnread: {
            position: 'absolute',
            top: -4,
            right: -4,
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
            minWidth: 20,
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        groupUnreadText: {
            color: '#fff',
            fontSize: 10,
            fontWeight: 'bold',
        },
        createGroupCard: {
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.lg,
            padding: spacing.md,
            alignItems: 'center',
            minWidth: 100,
            borderWidth: 2,
            borderStyle: 'dashed',
            borderColor: theme.colors.border,
        },
        createGroupIcon: {
            fontSize: 32,
            marginBottom: spacing.xs,
            opacity: 0.5,
        },
        friendItem: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.md,
            marginBottom: spacing.sm,
            ...shadows.small,
        },
        friendAvatar: {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: theme.colors.backgroundSecondary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.md,
        },
        friendAvatarText: {
            fontSize: 24,
        },
        friendInfo: {
            flex: 1,
        },
        friendName: {
            ...textStyles.body,
            color: theme.colors.text,
            fontWeight: 'bold',
        },
        friendLastMessage: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
            marginTop: 2,
        },
        friendRight: {
            alignItems: 'flex-end',
        },
        statusDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            marginBottom: 4,
        },
        statusOnline: {
            backgroundColor: theme.colors.success,
        },
        statusOffline: {
            backgroundColor: theme.colors.textTertiary,
        },
        statusAway: {
            backgroundColor: theme.colors.warning,
        },
        unreadBadge: {
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
            minWidth: 20,
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        unreadText: {
            color: '#fff',
            fontSize: 10,
            fontWeight: 'bold',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('chat.friends')}</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('QRCode')}>
                    <Text style={styles.addButtonText}>➕</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
                {/* Search */}
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search friends..."
                        placeholderTextColor={theme.colors.textTertiary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Groups */}
                <Text style={styles.sectionTitle}>Groups</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.groupsRow}>
                    <TouchableOpacity style={styles.createGroupCard} onPress={() => navigation.navigate('CreateGroup')}>
                        <Text style={styles.createGroupIcon}>➕</Text>
                        <Text style={[styles.groupName, { opacity: 0.5 }]}>Create</Text>
                    </TouchableOpacity>
                    {groups.map((group) => (
                        <TouchableOpacity
                            key={group.id}
                            style={styles.groupCard}
                            onPress={() => navigation.navigate('GroupChat', { group })}
                        >
                            {group.unread > 0 && (
                                <View style={styles.groupUnread}>
                                    <Text style={styles.groupUnreadText}>{group.unread}</Text>
                                </View>
                            )}
                            <Text style={styles.groupIcon}>{group.icon}</Text>
                            <Text style={styles.groupName}>{group.name}</Text>
                            <Text style={styles.groupMembers}>{group.members} members</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Friends List */}
                <Text style={styles.sectionTitle}>Friends ({filteredFriends.length})</Text>
                {filteredFriends.map((friend) => (
                    <TouchableOpacity
                        key={friend.id}
                        style={styles.friendItem}
                        onPress={() => navigation.navigate('FriendChat', { friend })}
                    >
                        <View style={styles.friendAvatar}>
                            <Text style={styles.friendAvatarText}>{friend.avatar}</Text>
                        </View>
                        <View style={styles.friendInfo}>
                            <Text style={styles.friendName}>{friend.name}</Text>
                            <Text style={styles.friendLastMessage} numberOfLines={1}>{friend.lastMessage}</Text>
                        </View>
                        <View style={styles.friendRight}>
                            <View style={[
                                styles.statusDot,
                                friend.status === 'online' ? styles.statusOnline :
                                    friend.status === 'away' ? styles.statusAway : styles.statusOffline
                            ]} />
                            {friend.unread > 0 && (
                                <View style={styles.unreadBadge}>
                                    <Text style={styles.unreadText}>{friend.unread}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};
