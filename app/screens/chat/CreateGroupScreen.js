import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../../components/common/Button';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

export const CreateGroupScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [groupName, setGroupName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('💪');
    const [selectedFriends, setSelectedFriends] = useState([]);

    const icons = ['💪', '🔥', '🏋️', '🏃', '🧘', '🚴', '⚡', '🎯', '🌅', '🏆'];

    const friends = [
        { id: '1', name: 'Alex Johnson', avatar: '🏋️' },
        { id: '2', name: 'Sarah Miller', avatar: '🧘' },
        { id: '3', name: 'Mike Chen', avatar: '🏃' },
        { id: '4', name: 'Emma Wilson', avatar: '💪' },
        { id: '5', name: 'James Brown', avatar: '🚴' },
    ];

    const toggleFriend = (friendId) => {
        if (selectedFriends.includes(friendId)) {
            setSelectedFriends(selectedFriends.filter(id => id !== friendId));
        } else {
            if (selectedFriends.length < 3) { // Max 3 + you = 4
                setSelectedFriends([...selectedFriends, friendId]);
            } else {
                Alert.alert('Limit Reached', 'Maximum 4 members per group (including you)');
            }
        }
    };

    const createGroup = async () => {
        if (!groupName.trim()) {
            Alert.alert('Error', 'Please enter a group name');
            return;
        }
        if (selectedFriends.length === 0) {
            Alert.alert('Error', 'Please select at least one friend');
            return;
        }

        const newGroup = {
            id: `g${Date.now()}`,
            name: groupName,
            icon: selectedIcon,
            members: selectedFriends.length + 1,
            lastMessage: 'Group created',
            unread: 0,
        };

        try {
            const data = await AsyncStorage.getItem('friendsData');
            const parsed = data ? JSON.parse(data) : { friends: [], groups: [] };
            parsed.groups = [...(parsed.groups || []), newGroup];
            await AsyncStorage.setItem('friendsData', JSON.stringify(parsed));

            Alert.alert('Success', 'Group created successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert('Error', 'Failed to create group');
        }
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
        input: {
            ...textStyles.body,
            color: theme.colors.text,
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
        },
        iconsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: spacing.sm,
        },
        iconButton: {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: theme.colors.backgroundSecondary,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: 'transparent',
        },
        iconButtonSelected: {
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.primary + '20',
        },
        iconText: {
            fontSize: 24,
        },
        friendItem: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: spacing.md,
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.md,
            marginBottom: spacing.sm,
            borderWidth: 2,
            borderColor: 'transparent',
        },
        friendItemSelected: {
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.primary + '20',
        },
        friendAvatar: {
            fontSize: 24,
            marginRight: spacing.md,
        },
        friendName: {
            ...textStyles.body,
            color: theme.colors.text,
            flex: 1,
        },
        checkMark: {
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: theme.colors.border,
            alignItems: 'center',
            justifyContent: 'center',
        },
        checkMarkSelected: {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
        },
        checkMarkText: {
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold',
        },
        selectedCount: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
            marginTop: spacing.sm,
        },
        buttonContainer: {
            padding: spacing.lg,
            paddingBottom: spacing.xl,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Group</Text>
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Group Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter group name..."
                        placeholderTextColor={theme.colors.textTertiary}
                        value={groupName}
                        onChangeText={setGroupName}
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Group Icon</Text>
                    <View style={styles.iconsGrid}>
                        {icons.map((icon) => (
                            <TouchableOpacity
                                key={icon}
                                style={[styles.iconButton, selectedIcon === icon && styles.iconButtonSelected]}
                                onPress={() => setSelectedIcon(icon)}
                            >
                                <Text style={styles.iconText}>{icon}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Add Members</Text>
                    {friends.map((friend) => {
                        const isSelected = selectedFriends.includes(friend.id);
                        return (
                            <TouchableOpacity
                                key={friend.id}
                                style={[styles.friendItem, isSelected && styles.friendItemSelected]}
                                onPress={() => toggleFriend(friend.id)}
                            >
                                <Text style={styles.friendAvatar}>{friend.avatar}</Text>
                                <Text style={styles.friendName}>{friend.name}</Text>
                                <View style={[styles.checkMark, isSelected && styles.checkMarkSelected]}>
                                    {isSelected && <Text style={styles.checkMarkText}>✓</Text>}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                    <Text style={styles.selectedCount}>
                        {selectedFriends.length + 1}/4 members selected (max 4)
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <Button title="Create Group" onPress={createGroup} />
            </View>
        </SafeAreaView>
    );
};
