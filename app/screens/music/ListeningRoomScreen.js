import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

export const ListeningRoomScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { t } = useTranslation();
    const [isHost, setIsHost] = useState(false);
    const [roomMembers, setRoomMembers] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [roomCode, setRoomCode] = useState('');

    const sampleSongs = [
        { id: '1', title: 'Lose Yourself', artist: 'Eminem', duration: '5:26', icon: '🎤' },
        { id: '2', title: 'Eye of the Tiger', artist: 'Survivor', duration: '4:05', icon: '🐯' },
        { id: '3', title: 'Stronger', artist: 'Kanye West', duration: '5:12', icon: '💪' },
        { id: '4', title: 'Till I Collapse', artist: 'Eminem', duration: '4:57', icon: '🔥' },
        { id: '5', title: "Can't Hold Us", artist: 'Macklemore', duration: '4:18', icon: '🚀' },
    ];

    const availableListeners = [
        { id: '1', name: 'Alex', avatar: '🏋️' },
        { id: '2', name: 'Sarah', avatar: '🧘' },
        { id: '3', name: 'Mike', avatar: '🏃' },
    ];

    useEffect(() => {
        loadRoomState();
    }, []);

    const loadRoomState = async () => {
        try {
            const data = await AsyncStorage.getItem('listeningRoom');
            if (data) {
                const parsed = JSON.parse(data);
                setRoomMembers(parsed.members || []);
                setCurrentSong(parsed.currentSong || null);
                setIsHost(parsed.isHost || false);
                setRoomCode(parsed.roomCode || '');
            }
        } catch (error) {
            console.log('Error loading room state:', error);
        }
    };

    const createRoom = async () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        const roomState = {
            isHost: true,
            roomCode: code,
            members: [{ id: 'me', name: user?.username || 'You', avatar: '💪' }],
            currentSong: null,
        };
        setIsHost(true);
        setRoomCode(code);
        setRoomMembers(roomState.members);
        await AsyncStorage.setItem('listeningRoom', JSON.stringify(roomState));
        Alert.alert('Room Created', `Share code: ${code}`);
    };

    const joinRoom = () => {
        Alert.prompt(
            'Join Room',
            'Enter room code:',
            async (code) => {
                if (code) {
                    // Simulate joining
                    const newMember = { id: 'me', name: user?.username || 'You', avatar: '💪' };
                    const simulatedMembers = [
                        { id: 'host', name: 'Alex', avatar: '🏋️' },
                        newMember,
                    ];
                    setRoomMembers(simulatedMembers);
                    setRoomCode(code.toUpperCase());
                    setIsHost(false);
                    Alert.alert('Joined!', 'You joined the listening room');
                }
            },
            'plain-text',
            '',
            'default'
        );
    };

    const inviteFriend = (friend) => {
        if (roomMembers.length >= 4) {
            Alert.alert('Room Full', 'Maximum 4 listeners allowed');
            return;
        }
        if (roomMembers.find(m => m.id === friend.id)) {
            Alert.alert('Already Invited', 'This friend is already in the room');
            return;
        }
        const newMembers = [...roomMembers, friend];
        setRoomMembers(newMembers);
        Alert.alert('Invited', `${friend.name} has been invited!`);
    };

    const playSong = (song) => {
        setCurrentSong(song);
        setIsPlaying(true);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const leaveRoom = async () => {
        await AsyncStorage.removeItem('listeningRoom');
        setRoomMembers([]);
        setCurrentSong(null);
        setIsHost(false);
        setRoomCode('');
        navigation.goBack();
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
        noRoomCard: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.xl,
            alignItems: 'center',
            ...shadows.medium,
        },
        noRoomIcon: {
            fontSize: 64,
            marginBottom: spacing.lg,
        },
        noRoomTitle: {
            ...textStyles.h3,
            color: theme.colors.text,
            marginBottom: spacing.sm,
        },
        noRoomText: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            marginBottom: spacing.xl,
        },
        buttonsRow: {
            flexDirection: 'row',
            gap: spacing.md,
        },
        button: {
            flex: 1,
            paddingVertical: spacing.md,
            borderRadius: borderRadius.md,
            alignItems: 'center',
        },
        primaryButton: {
            backgroundColor: theme.colors.primary,
        },
        secondaryButton: {
            backgroundColor: theme.colors.backgroundSecondary,
            borderWidth: 1,
            borderColor: theme.colors.border,
        },
        buttonText: {
            ...textStyles.body,
            fontWeight: 'bold',
        },
        primaryButtonText: {
            color: '#fff',
        },
        secondaryButtonText: {
            color: theme.colors.text,
        },
        roomCard: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginBottom: spacing.lg,
            ...shadows.medium,
        },
        roomHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.lg,
        },
        roomCodeContainer: {
            alignItems: 'center',
        },
        roomCodeLabel: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
        },
        roomCode: {
            ...textStyles.h3,
            color: theme.colors.primary,
            fontWeight: 'bold',
            letterSpacing: 4,
        },
        membersRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: spacing.lg,
        },
        memberAvatar: {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: theme.colors.backgroundSecondary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: -10,
            borderWidth: 3,
            borderColor: theme.colors.card,
        },
        memberAvatarText: {
            fontSize: 24,
        },
        memberCount: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
            marginLeft: spacing.lg,
        },
        nowPlayingCard: {
            backgroundColor: theme.colors.primary + '15',
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginBottom: spacing.lg,
            borderWidth: 1,
            borderColor: theme.colors.primary + '30',
        },
        nowPlayingLabel: {
            ...textStyles.caption,
            color: theme.colors.primary,
            fontWeight: 'bold',
            marginBottom: spacing.sm,
        },
        nowPlayingRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        songIcon: {
            fontSize: 48,
            marginRight: spacing.md,
        },
        songInfo: {
            flex: 1,
        },
        songTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
        },
        songArtist: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
        },
        controlsRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: spacing.lg,
            marginTop: spacing.lg,
        },
        controlButton: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: theme.colors.backgroundSecondary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        playPauseButton: {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: theme.colors.primary,
        },
        controlText: {
            fontSize: 20,
        },
        sectionTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.md,
        },
        inviteCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            marginBottom: spacing.sm,
        },
        inviteAvatar: {
            fontSize: 24,
            marginRight: spacing.md,
        },
        inviteName: {
            ...textStyles.body,
            color: theme.colors.text,
            flex: 1,
        },
        inviteButton: {
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            backgroundColor: theme.colors.primary,
            borderRadius: borderRadius.sm,
        },
        inviteButtonText: {
            ...textStyles.caption,
            color: '#fff',
            fontWeight: 'bold',
        },
        songItem: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            marginBottom: spacing.sm,
            ...shadows.small,
        },
        songItemIcon: {
            fontSize: 24,
            marginRight: spacing.md,
        },
        songItemInfo: {
            flex: 1,
        },
        songItemTitle: {
            ...textStyles.body,
            color: theme.colors.text,
        },
        songItemArtist: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
        },
        songItemDuration: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
        },
        leaveButton: {
            marginTop: spacing.lg,
        },
    });

    // No room state
    if (roomMembers.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>👥 Listening Room</Text>
                </View>

                <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.noRoomCard}>
                        <Text style={styles.noRoomIcon}>🎧</Text>
                        <Text style={styles.noRoomTitle}>Listening Room</Text>
                        <Text style={styles.noRoomText}>
                            Listen to music together with 2-4 friends in real-time.
                            Create a room or join an existing one!
                        </Text>
                        <View style={styles.buttonsRow}>
                            <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={createRoom}>
                                <Text style={[styles.buttonText, styles.primaryButtonText]}>Create Room</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={joinRoom}>
                                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Join Room</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>👥 Listening Room</Text>
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
                {/* Room Info */}
                <View style={styles.roomCard}>
                    <View style={styles.roomHeader}>
                        <View style={styles.roomCodeContainer}>
                            <Text style={styles.roomCodeLabel}>ROOM CODE</Text>
                            <Text style={styles.roomCode}>{roomCode}</Text>
                        </View>
                        <Text>{isHost ? '👑 Host' : '🎧 Listener'}</Text>
                    </View>

                    <View style={styles.membersRow}>
                        {roomMembers.map((member, index) => (
                            <View key={member.id} style={[styles.memberAvatar, { zIndex: roomMembers.length - index }]}>
                                <Text style={styles.memberAvatarText}>{member.avatar}</Text>
                            </View>
                        ))}
                        <Text style={styles.memberCount}>{roomMembers.length}/4 listeners</Text>
                    </View>
                </View>

                {/* Now Playing */}
                {currentSong ? (
                    <View style={styles.nowPlayingCard}>
                        <Text style={styles.nowPlayingLabel}>NOW PLAYING</Text>
                        <View style={styles.nowPlayingRow}>
                            <Text style={styles.songIcon}>{currentSong.icon}</Text>
                            <View style={styles.songInfo}>
                                <Text style={styles.songTitle}>{currentSong.title}</Text>
                                <Text style={styles.songArtist}>{currentSong.artist}</Text>
                            </View>
                        </View>
                        <View style={styles.controlsRow}>
                            <TouchableOpacity style={styles.controlButton}>
                                <Text style={styles.controlText}>⏮</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.controlButton, styles.playPauseButton]} onPress={togglePlayPause}>
                                <Text style={[styles.controlText, { color: '#fff' }]}>{isPlaying ? '⏸' : '▶'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.controlButton}>
                                <Text style={styles.controlText}>⏭</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={[styles.nowPlayingCard, { alignItems: 'center' }]}>
                        <Text style={{ fontSize: 32, marginBottom: spacing.sm }}>🎵</Text>
                        <Text style={styles.songTitle}>No song playing</Text>
                        <Text style={styles.songArtist}>Select a song to start</Text>
                    </View>
                )}

                {/* Invite Friends */}
                {isHost && roomMembers.length < 4 && (
                    <>
                        <Text style={styles.sectionTitle}>Invite Friends</Text>
                        {availableListeners.filter(l => !roomMembers.find(m => m.id === l.id)).map((friend) => (
                            <View key={friend.id} style={styles.inviteCard}>
                                <Text style={styles.inviteAvatar}>{friend.avatar}</Text>
                                <Text style={styles.inviteName}>{friend.name}</Text>
                                <TouchableOpacity style={styles.inviteButton} onPress={() => inviteFriend(friend)}>
                                    <Text style={styles.inviteButtonText}>Invite</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </>
                )}

                {/* Song Queue */}
                <Text style={styles.sectionTitle}>Play a Song</Text>
                {sampleSongs.map((song) => (
                    <TouchableOpacity key={song.id} style={styles.songItem} onPress={() => playSong(song)}>
                        <Text style={styles.songItemIcon}>{song.icon}</Text>
                        <View style={styles.songItemInfo}>
                            <Text style={styles.songItemTitle}>{song.title}</Text>
                            <Text style={styles.songItemArtist}>{song.artist}</Text>
                        </View>
                        <Text style={styles.songItemDuration}>{song.duration}</Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={[styles.button, styles.secondaryButton, styles.leaveButton]} onPress={leaveRoom}>
                    <Text style={[styles.buttonText, styles.secondaryButtonText]}>Leave Room</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};
