import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

export const GroupChatScreen = ({ navigation, route }) => {
    const { group } = route.params;
    const { theme } = useTheme();
    const { user } = useAuth();
    const { t } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef(null);

    const groupMembers = [
        { id: '1', name: 'Alex', avatar: '🏋️' },
        { id: '2', name: 'Sarah', avatar: '🧘' },
        { id: '3', name: 'Mike', avatar: '🏃' },
        { id: '4', name: 'You', avatar: '💪' },
    ];

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const data = await AsyncStorage.getItem(`group_${group.id}`);
            if (data) {
                setMessages(JSON.parse(data));
            } else {
                setMessages([
                    { id: '1', text: 'Welcome to the group! 🎉', sender: { id: '1', name: 'Alex', avatar: '🏋️' }, timestamp: new Date(Date.now() - 7200000) },
                    { id: '2', text: 'Ready to crush some workouts!', sender: { id: '2', name: 'Sarah', avatar: '🧘' }, timestamp: new Date(Date.now() - 3600000) },
                    { id: '3', text: 'Let\'s go team! 💪', sender: { id: '3', name: 'Mike', avatar: '🏃' }, timestamp: new Date(Date.now() - 1800000) },
                ]);
            }
        } catch (error) {
            console.log('Error loading messages:', error);
        }
    };

    const saveMessages = async (newMessages) => {
        try {
            await AsyncStorage.setItem(`group_${group.id}`, JSON.stringify(newMessages));
        } catch (error) {
            console.log('Error saving messages:', error);
        }
    };

    const sendMessage = (text) => {
        if (!text.trim()) return;

        const userMessage = {
            id: Date.now().toString(),
            text: text.trim(),
            sender: { id: 'me', name: user?.username || 'You', avatar: '💪' },
            timestamp: new Date(),
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        saveMessages(newMessages);
        setInputText('');

        // Simulate group member response
        setTimeout(() => {
            const responses = [
                { text: "🔥 Let's go!", member: groupMembers[0] },
                { text: "Awesome! I'm ready!", member: groupMembers[1] },
                { text: "Count me in! 💪", member: groupMembers[2] },
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const response = {
                id: (Date.now() + 1).toString(),
                text: randomResponse.text,
                sender: randomResponse.member,
                timestamp: new Date(),
            };
            const updatedMessages = [...newMessages, response];
            setMessages(updatedMessages);
            saveMessages(updatedMessages);
        }, 2000);
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
            backgroundColor: theme.colors.card,
        },
        backButton: {
            padding: spacing.sm,
            marginRight: spacing.md,
        },
        backButtonText: {
            fontSize: 24,
            color: theme.colors.text,
        },
        headerIcon: {
            fontSize: 28,
            marginRight: spacing.md,
        },
        headerContent: {
            flex: 1,
        },
        headerTitle: {
            ...textStyles.body,
            color: theme.colors.text,
            fontWeight: 'bold',
        },
        headerMembers: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
        },
        messagesList: {
            flex: 1,
        },
        messagesContent: {
            padding: spacing.lg,
        },
        messageContainer: {
            marginBottom: spacing.md,
            maxWidth: '80%',
        },
        messageContainerUser: {
            alignSelf: 'flex-end',
        },
        messageContainerOther: {
            alignSelf: 'flex-start',
        },
        messageSender: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 4,
        },
        messageSenderAvatar: {
            fontSize: 14,
            marginRight: 4,
        },
        messageSenderName: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
            fontWeight: 'bold',
        },
        messageBubble: {
            borderRadius: borderRadius.lg,
            padding: spacing.md,
        },
        messageBubbleUser: {
            backgroundColor: theme.colors.primary,
        },
        messageBubbleOther: {
            backgroundColor: theme.colors.card,
            borderWidth: 1,
            borderColor: theme.colors.border,
        },
        messageText: {
            ...textStyles.body,
        },
        messageTextUser: {
            color: '#FFFFFF',
        },
        messageTextOther: {
            color: theme.colors.text,
        },
        messageTime: {
            ...textStyles.caption,
            marginTop: spacing.xs,
        },
        messageTimeUser: {
            color: '#FFFFFF',
            opacity: 0.8,
            textAlign: 'right',
        },
        messageTimeOther: {
            color: theme.colors.textTertiary,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: spacing.lg,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
            backgroundColor: theme.colors.card,
            gap: spacing.md,
        },
        input: {
            flex: 1,
            ...textStyles.body,
            color: theme.colors.text,
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.round,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            maxHeight: 100,
        },
        sendButton: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        sendButtonDisabled: {
            backgroundColor: theme.colors.border,
        },
        sendButtonText: {
            fontSize: 20,
        },
    });

    const renderMessage = ({ item }) => {
        const isUser = item.sender.id === 'me';
        return (
            <View style={[
                styles.messageContainer,
                isUser ? styles.messageContainerUser : styles.messageContainerOther,
            ]}>
                {!isUser && (
                    <View style={styles.messageSender}>
                        <Text style={styles.messageSenderAvatar}>{item.sender.avatar}</Text>
                        <Text style={styles.messageSenderName}>{item.sender.name}</Text>
                    </View>
                )}
                <View style={[
                    styles.messageBubble,
                    isUser ? styles.messageBubbleUser : styles.messageBubbleOther,
                ]}>
                    <Text style={[
                        styles.messageText,
                        isUser ? styles.messageTextUser : styles.messageTextOther,
                    ]}>
                        {item.text}
                    </Text>
                    <Text style={[
                        styles.messageTime,
                        isUser ? styles.messageTimeUser : styles.messageTimeOther,
                    ]}>
                        {new Date(item.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerIcon}>{group.icon}</Text>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>{group.name}</Text>
                    <Text style={styles.headerMembers}>{group.members} members</Text>
                </View>
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={[styles.messagesContent, { flexGrow: 1 }]}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                    showsVerticalScrollIndicator={true}
                    bounces={true}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Type a message..."
                        placeholderTextColor={theme.colors.textTertiary}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                        onPress={() => sendMessage(inputText)}
                        disabled={!inputText.trim()}
                    >
                        <Text style={styles.sendButtonText}>➤</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
