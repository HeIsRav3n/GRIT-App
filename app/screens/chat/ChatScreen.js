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
    ScrollView,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { TopBar } from '../../components/navigation/TopBar';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

export const ChatScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { t } = useTranslation();
    const [messages, setMessages] = useState([
        {
            id: '1',
            text: `Hello, ${user?.username}! I'm your AI Fitness Coach. How can I help you today?`,
            sender: 'coach',
            timestamp: new Date(),
        },
    ]);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef(null);

    const quickReplies = [
        { id: '1', text: t('coach.quickReplies.easier'), icon: '😌', short: 'Easier' },
        { id: '2', text: t('coach.quickReplies.harder'), icon: '🔥', short: 'Harder' },
        { id: '3', text: t('coach.quickReplies.sore'), icon: '💪', short: 'Sore' },
        { id: '4', text: t('coach.quickReplies.short'), icon: '⏱️', short: '20min' },
        { id: '5', text: t('coach.quickReplies.hydration'), icon: '💧', short: 'Water' },
        { id: '6', text: t('coach.quickReplies.motivate'), icon: '⚡', short: 'Motivate' },
    ];

    const sendMessage = (text) => {
        if (!text.trim()) return;

        const userMessage = {
            id: Date.now().toString(),
            text: text.trim(),
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText('');

        // Simulate AI response
        setTimeout(() => {
            const coachResponse = {
                id: (Date.now() + 1).toString(),
                text: getCoachResponse(text),
                sender: 'coach',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, coachResponse]);
        }, 1000);
    };

    const getCoachResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('easier')) {
            return "I understand! I'll adjust your workout to be more manageable. Let's reduce the intensity and focus on proper form. You're doing great! 💪";
        } else if (lowerMessage.includes('harder')) {
            return "Love the energy! 🔥 I'll increase the intensity for your next session. Remember to maintain proper form even when pushing harder!";
        } else if (lowerMessage.includes('sore')) {
            return "Muscle soreness is normal, but let's be smart about it. I'll adjust your plan to include more recovery exercises and stretching. Make sure you're staying hydrated! 💧";
        } else if (lowerMessage.includes('20')) {
            return "Quick workout coming up! Here's a 20-minute HIIT session that will get your heart pumping and muscles working. Quality over quantity! ⚡";
        } else if (lowerMessage.includes('hydration') || lowerMessage.includes('water')) {
            return "Great question! Based on your activity level, aim for 2.5-3 liters of water daily. Drink before, during, and after workouts. Stay hydrated! 💧";
        } else if (lowerMessage.includes('motivate')) {
            return "You've got this! 💪 Remember why you started. Every rep, every set, every drop of sweat is bringing you closer to your goals. You're stronger than you think!";
        } else {
            return "I'm here to help! You can ask me about workouts, nutrition, form tips, or use the quick replies below for common requests. Let's crush your fitness goals together! 🏋️";
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
            backgroundColor: theme.colors.card,
        },
        backButton: {
            padding: spacing.sm,
            marginRight: spacing.md,
        },
        backButtonText: {
            fontSize: 24,
        },
        headerContent: {
            flex: 1,
        },
        headerTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
        },
        headerSubtitle: {
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
        messageContainerCoach: {
            alignSelf: 'flex-start',
        },
        messageBubble: {
            borderRadius: borderRadius.lg,
            padding: spacing.md,
        },
        messageBubbleUser: {
            backgroundColor: theme.colors.primary,
        },
        messageBubbleCoach: {
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
        messageTextCoach: {
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
        messageTimeCoach: {
            color: theme.colors.textTertiary,
        },
        quickRepliesContainer: {
            paddingHorizontal: spacing.sm,
            paddingVertical: spacing.xs,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
            maxHeight: 50,
        },
        quickRepliesTitle: {
            display: 'none',
        },
        quickRepliesScroll: {
            flexDirection: 'row',
            gap: spacing.xs,
            overflow: 'scroll',
        },
        quickReplyChip: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.round,
            paddingHorizontal: spacing.sm,
            paddingVertical: 4,
            gap: 4,
            borderWidth: 1,
            borderColor: theme.colors.border,
        },
        quickReplyIcon: {
            fontSize: 12,
        },
        quickReplyText: {
            fontSize: 11,
            color: theme.colors.text,
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
        const isUser = item.sender === 'user';
        return (
            <View
                style={[
                    styles.messageContainer,
                    isUser ? styles.messageContainerUser : styles.messageContainerCoach,
                ]}
            >
                <View
                    style={[
                        styles.messageBubble,
                        isUser ? styles.messageBubbleUser : styles.messageBubbleCoach,
                    ]}
                >
                    <Text
                        style={[
                            styles.messageText,
                            isUser ? styles.messageTextUser : styles.messageTextCoach,
                        ]}
                    >
                        {item.text}
                    </Text>
                    <Text
                        style={[
                            styles.messageTime,
                            isUser ? styles.messageTimeUser : styles.messageTimeCoach,
                        ]}
                    >
                        {item.timestamp.toLocaleTimeString([], {
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
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>{t('chat.aiCoach')}</Text>
                    <Text style={styles.headerSubtitle}>● Online</Text>
                </View>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('FriendsList')}>
                    <Text style={{ fontSize: 20 }}>👥</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                {/* Messages List */}
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={[styles.messagesContent, { flexGrow: 1 }]}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={20}
                    initialNumToRender={20}
                    windowSize={10}
                    showsVerticalScrollIndicator={true}
                    bounces={true}
                />

                {/* Quick Replies - Compact Horizontal */}
                <View style={styles.quickRepliesContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={true}
                        contentContainerStyle={[styles.quickRepliesScroll, { flexGrow: 1 }]}
                    >
                        {quickReplies.map((reply) => (
                            <TouchableOpacity
                                key={reply.id}
                                style={styles.quickReplyChip}
                                onPress={() => sendMessage(reply.text)}
                            >
                                <Text style={styles.quickReplyIcon}>{reply.icon}</Text>
                                <Text style={styles.quickReplyText}>{reply.short}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Input Area */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder={t('chat.typeMessage')}
                        placeholderTextColor={theme.colors.textTertiary}
                        multiline
                    />
                    <TouchableOpacity
                        style={[
                            styles.sendButton,
                            !inputText.trim() && styles.sendButtonDisabled,
                        ]}
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
