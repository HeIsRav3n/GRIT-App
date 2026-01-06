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

export const FriendChatScreen = ({ navigation, route }) => {
    const { friend } = route.params;
    const { theme } = useTheme();
    const { user } = useAuth();
    const { t } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef(null);

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const data = await AsyncStorage.getItem(`chat_${friend.id}`);
            if (data) {
                setMessages(JSON.parse(data));
            } else {
                // Initial message
                setMessages([
                    {
                        id: '1',
                        text: `Hey ${user?.username}! Ready to crush some workouts together? 💪`,
                        sender: friend.id,
                        timestamp: new Date(Date.now() - 3600000),
                    }
                ]);
            }
        } catch (error) {
            console.log('Error loading messages:', error);
        }
    };

    const saveMessages = async (newMessages) => {
        try {
            await AsyncStorage.setItem(`chat_${friend.id}`, JSON.stringify(newMessages));
        } catch (error) {
            console.log('Error saving messages:', error);
        }
    };

    const sendMessage = (text) => {
        if (!text.trim()) return;

        const userMessage = {
            id: Date.now().toString(),
            text: text.trim(),
            sender: 'me',
            timestamp: new Date(),
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        saveMessages(newMessages);
        setInputText('');

        // Simulate response
        setTimeout(() => {
            const responses = [
                "Awesome! Let's do it! 🔥",
                "Sounds great! See you there!",
                "I'm in! What time?",
                "Can't wait! 💪",
                "Let's crush it together!",
            ];
            const response = {
                id: (Date.now() + 1).toString(),
                text: responses[Math.floor(Math.random() * responses.length)],
                sender: friend.id,
                timestamp: new Date(),
            };
            const updatedMessages = [...newMessages, response];
            setMessages(updatedMessages);
            saveMessages(updatedMessages);
        }, 1500);
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
        headerAvatar: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: theme.colors.backgroundSecondary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.md,
        },
        headerAvatarText: {
            fontSize: 20,
        },
        headerContent: {
            flex: 1,
        },
        headerTitle: {
            ...textStyles.body,
            color: theme.colors.text,
            fontWeight: 'bold',
        },
        headerStatus: {
            ...textStyles.caption,
            color: theme.colors.success,
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
        messageContainerFriend: {
            alignSelf: 'flex-start',
        },
        messageBubble: {
            borderRadius: borderRadius.lg,
            padding: spacing.md,
        },
        messageBubbleUser: {
            backgroundColor: theme.colors.primary,
        },
        messageBubbleFriend: {
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
        messageTextFriend: {
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
        messageTimeFriend: {
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
        const isUser = item.sender === 'me';
        return (
            <View style={[
                styles.messageContainer,
                isUser ? styles.messageContainerUser : styles.messageContainerFriend,
            ]}>
                <View style={[
                    styles.messageBubble,
                    isUser ? styles.messageBubbleUser : styles.messageBubbleFriend,
                ]}>
                    <Text style={[
                        styles.messageText,
                        isUser ? styles.messageTextUser : styles.messageTextFriend,
                    ]}>
                        {item.text}
                    </Text>
                    <Text style={[
                        styles.messageTime,
                        isUser ? styles.messageTimeUser : styles.messageTimeFriend,
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
                <View style={styles.headerAvatar}>
                    <Text style={styles.headerAvatarText}>{friend.avatar}</Text>
                </View>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>{friend.name}</Text>
                    <Text style={styles.headerStatus}>● {friend.status}</Text>
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
                    contentContainerStyle={styles.messagesContent}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                    showsVerticalScrollIndicator={false}
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
