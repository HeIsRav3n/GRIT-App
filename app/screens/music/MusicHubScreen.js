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
import { Button } from '../../components/common/Button';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

export const MusicHubScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [connectedServices, setConnectedServices] = useState([]);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

    const musicServices = [
        {
            id: 'spotify',
            name: 'Spotify',
            icon: '🎵',
            color: '#1DB954',
            description: 'Stream millions of songs'
        },
        {
            id: 'apple',
            name: 'Apple Music',
            icon: '🍎',
            color: '#FC3C44',
            description: 'Access your Apple library'
        },
        {
            id: 'soundcloud',
            name: 'SoundCloud',
            icon: '☁️',
            color: '#FF5500',
            description: 'Discover new artists'
        },
        {
            id: 'audiomack',
            name: 'Audiomack',
            icon: '🎧',
            color: '#FFA200',
            description: 'Free unlimited music'
        },
    ];

    const workoutPlaylists = [
        { id: '1', name: 'High Energy HIIT', icon: '🔥', songs: 25, duration: '1h 15m' },
        { id: '2', name: 'Pump Iron Beats', icon: '🏋️', songs: 30, duration: '1h 45m' },
        { id: '3', name: 'Cardio Rush', icon: '🏃', songs: 20, duration: '55m' },
        { id: '4', name: 'Yoga Flow', icon: '🧘', songs: 15, duration: '45m' },
        { id: '5', name: 'Beast Mode', icon: '💪', songs: 28, duration: '1h 30m' },
    ];

    useEffect(() => {
        loadConnectedServices();
    }, []);

    const loadConnectedServices = async () => {
        try {
            const data = await AsyncStorage.getItem('connectedMusicServices');
            if (data) {
                setConnectedServices(JSON.parse(data));
            }
        } catch (error) {
            console.log('Error loading services:', error);
        }
    };

    const connectService = async (serviceId) => {
        // In production, this would open OAuth flow
        Alert.alert(
            'Connect Service',
            `Connect to ${musicServices.find(s => s.id === serviceId)?.name}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Connect',
                    onPress: async () => {
                        const newServices = [...connectedServices, serviceId];
                        setConnectedServices(newServices);
                        await AsyncStorage.setItem('connectedMusicServices', JSON.stringify(newServices));
                        Alert.alert('Success', 'Service connected successfully!');
                    }
                }
            ]
        );
    };

    const disconnectService = async (serviceId) => {
        Alert.alert(
            'Disconnect Service',
            'Are you sure you want to disconnect?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Disconnect',
                    style: 'destructive',
                    onPress: async () => {
                        const newServices = connectedServices.filter(id => id !== serviceId);
                        setConnectedServices(newServices);
                        await AsyncStorage.setItem('connectedMusicServices', JSON.stringify(newServices));
                    }
                }
            ]
        );
    };

    const playPlaylist = (playlist) => {
        setCurrentlyPlaying(playlist);
        Alert.alert('Now Playing', `${playlist.name} - ${playlist.songs} songs`);
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
        heroCard: {
            backgroundColor: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primary}88)`,
            borderRadius: borderRadius.lg,
            padding: spacing.xl,
            marginBottom: spacing.lg,
            alignItems: 'center',
            ...shadows.medium,
            borderWidth: 1,
            borderColor: theme.colors.primary + '40',
        },
        heroIcon: {
            fontSize: 48,
            marginBottom: spacing.md,
        },
        heroTitle: {
            ...textStyles.h3,
            color: theme.colors.text,
            marginBottom: spacing.xs,
        },
        heroSubtitle: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
            textAlign: 'center',
        },
        listeningRoomButton: {
            backgroundColor: theme.colors.primary,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: spacing.lg,
            gap: spacing.sm,
        },
        listeningRoomText: {
            ...textStyles.body,
            color: '#fff',
            fontWeight: 'bold',
        },
        sectionTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.md,
            marginTop: spacing.md,
        },
        serviceCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginBottom: spacing.sm,
            ...shadows.small,
        },
        serviceIcon: {
            width: 50,
            height: 50,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.md,
        },
        serviceIconText: {
            fontSize: 28,
        },
        serviceInfo: {
            flex: 1,
        },
        serviceName: {
            ...textStyles.body,
            color: theme.colors.text,
            fontWeight: 'bold',
        },
        serviceDescription: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
        },
        connectButton: {
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            borderRadius: borderRadius.md,
            borderWidth: 1,
        },
        connectButtonConnect: {
            borderColor: theme.colors.primary,
        },
        connectButtonDisconnect: {
            borderColor: theme.colors.error,
            backgroundColor: theme.colors.error + '10',
        },
        connectButtonText: {
            ...textStyles.bodySmall,
            fontWeight: 'bold',
        },
        playlistsGrid: {
            gap: spacing.sm,
        },
        playlistCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.md,
            marginBottom: spacing.sm,
            ...shadows.small,
        },
        playlistCardPlaying: {
            borderWidth: 2,
            borderColor: theme.colors.primary,
        },
        playlistIcon: {
            fontSize: 32,
            marginRight: spacing.md,
        },
        playlistInfo: {
            flex: 1,
        },
        playlistName: {
            ...textStyles.body,
            color: theme.colors.text,
            fontWeight: 'bold',
        },
        playlistMeta: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
        },
        playButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        playButtonText: {
            color: '#fff',
            fontSize: 16,
        },
        nowPlaying: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginBottom: spacing.lg,
            flexDirection: 'row',
            alignItems: 'center',
            borderLeftWidth: 4,
            borderLeftColor: theme.colors.primary,
            ...shadows.medium,
        },
        nowPlayingIcon: {
            fontSize: 36,
            marginRight: spacing.md,
        },
        nowPlayingInfo: {
            flex: 1,
        },
        nowPlayingLabel: {
            ...textStyles.caption,
            color: theme.colors.primary,
            fontWeight: 'bold',
        },
        nowPlayingTitle: {
            ...textStyles.body,
            color: theme.colors.text,
            fontWeight: 'bold',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>🎵 Music Hub</Text>
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
                {/* Hero Section */}
                <View style={styles.heroCard}>
                    <Text style={styles.heroIcon}>🎧</Text>
                    <Text style={styles.heroTitle}>Workout Music</Text>
                    <Text style={styles.heroSubtitle}>
                        Connect your music services and listen together with friends
                    </Text>
                    <TouchableOpacity
                        style={styles.listeningRoomButton}
                        onPress={() => navigation.navigate('ListeningRoom')}
                    >
                        <Text>👥</Text>
                        <Text style={styles.listeningRoomText}>Join Listening Room</Text>
                    </TouchableOpacity>
                </View>

                {/* Now Playing */}
                {currentlyPlaying && (
                    <View style={styles.nowPlaying}>
                        <Text style={styles.nowPlayingIcon}>{currentlyPlaying.icon}</Text>
                        <View style={styles.nowPlayingInfo}>
                            <Text style={styles.nowPlayingLabel}>NOW PLAYING</Text>
                            <Text style={styles.nowPlayingTitle}>{currentlyPlaying.name}</Text>
                        </View>
                        <Text>🔊</Text>
                    </View>
                )}

                {/* Connect Services */}
                <Text style={styles.sectionTitle}>Connect Music Services</Text>
                {musicServices.map((service) => {
                    const isConnected = connectedServices.includes(service.id);
                    return (
                        <View key={service.id} style={styles.serviceCard}>
                            <View style={[styles.serviceIcon, { backgroundColor: service.color + '20' }]}>
                                <Text style={styles.serviceIconText}>{service.icon}</Text>
                            </View>
                            <View style={styles.serviceInfo}>
                                <Text style={styles.serviceName}>{service.name}</Text>
                                <Text style={styles.serviceDescription}>{service.description}</Text>
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.connectButton,
                                    isConnected ? styles.connectButtonDisconnect : styles.connectButtonConnect
                                ]}
                                onPress={() => isConnected ? disconnectService(service.id) : connectService(service.id)}
                            >
                                <Text style={[
                                    styles.connectButtonText,
                                    { color: isConnected ? theme.colors.error : theme.colors.primary }
                                ]}>
                                    {isConnected ? 'Disconnect' : 'Connect'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}

                {/* Workout Playlists */}
                <Text style={styles.sectionTitle}>Workout Playlists</Text>
                <View style={styles.playlistsGrid}>
                    {workoutPlaylists.map((playlist) => (
                        <TouchableOpacity
                            key={playlist.id}
                            style={[
                                styles.playlistCard,
                                currentlyPlaying?.id === playlist.id && styles.playlistCardPlaying
                            ]}
                            onPress={() => playPlaylist(playlist)}
                        >
                            <Text style={styles.playlistIcon}>{playlist.icon}</Text>
                            <View style={styles.playlistInfo}>
                                <Text style={styles.playlistName}>{playlist.name}</Text>
                                <Text style={styles.playlistMeta}>{playlist.songs} songs • {playlist.duration}</Text>
                            </View>
                            <View style={styles.playButton}>
                                <Text style={styles.playButtonText}>▶</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
