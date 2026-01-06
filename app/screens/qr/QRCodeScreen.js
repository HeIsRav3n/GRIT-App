import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from 'react-native';
import { Camera } from 'expo-camera';
import QRCode from 'react-native-qrcode-svg';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

export const QRCodeScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { t } = useTranslation();
    const [scanning, setScanning] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanning(false);
        Alert.alert(
            'Friend Request',
            `Send friend request to user?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Send Request',
                    onPress: () => {
                        Alert.alert('Success', 'Friend request sent!');
                        navigation.goBack();
                    },
                },
            ]
        );
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
        },
        headerTitle: {
            ...textStyles.h3,
            color: theme.colors.text,
            flex: 1,
        },
        content: {
            flex: 1,
            padding: spacing.lg,
        },
        qrContainer: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.xl,
            alignItems: 'center',
            marginBottom: spacing.lg,
            ...shadows.large,
        },
        qrTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.md,
        },
        qrSubtitle: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            marginBottom: spacing.xl,
        },
        qrCodeWrapper: {
            padding: spacing.lg,
            backgroundColor: '#FFFFFF',
            borderRadius: borderRadius.md,
            marginBottom: spacing.lg,
        },
        username: {
            ...textStyles.h4,
            color: theme.colors.text,
            textAlign: 'center',
        },
        userId: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            marginTop: spacing.xs,
        },
        divider: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: spacing.xl,
        },
        dividerLine: {
            flex: 1,
            height: 1,
            backgroundColor: theme.colors.border,
        },
        dividerText: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
            marginHorizontal: spacing.md,
        },
        scanButton: {
            marginBottom: spacing.md,
        },
        camera: {
            flex: 1,
            borderRadius: borderRadius.lg,
            overflow: 'hidden',
        },
        cameraOverlay: {
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
        },
        scanFrame: {
            width: 250,
            height: 250,
            borderWidth: 2,
            borderColor: '#FFFFFF',
            borderRadius: borderRadius.lg,
        },
        scanText: {
            ...textStyles.body,
            color: '#FFFFFF',
            marginTop: spacing.lg,
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: spacing.md,
            borderRadius: borderRadius.md,
        },
        cancelButton: {
            position: 'absolute',
            bottom: spacing.xl,
            left: spacing.lg,
            right: spacing.lg,
        },
    });

    if (scanning) {
        if (hasPermission === null) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={() => setScanning(false)}>
                            <Text style={styles.backButtonText}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Requesting Camera Permission...</Text>
                    </View>
                </SafeAreaView>
            );
        }
        if (hasPermission === false) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={() => setScanning(false)}>
                            <Text style={styles.backButtonText}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Camera Permission Denied</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={{ ...textStyles.body, color: theme.colors.text }}>
                            Please enable camera access in your device settings to scan QR codes.
                        </Text>
                        <Button
                            title="Go Back"
                            onPress={() => setScanning(false)}
                            style={{ marginTop: spacing.lg }}
                        />
                    </View>
                </SafeAreaView>
            );
        }

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => setScanning(false)}>
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Scan QR Code</Text>
                </View>
                <View style={styles.content}>
                    <Camera
                        style={styles.camera}
                        onBarCodeScanned={handleBarCodeScanned}
                        barCodeScannerSettings={{
                            barCodeTypes: ['qr'],
                        }}
                    >
                        <View style={styles.cameraOverlay}>
                            <View style={styles.scanFrame} />
                            <Text style={styles.scanText}>
                                Align QR code within the frame
                            </Text>
                        </View>
                    </Camera>
                    <Button
                        title="Cancel"
                        onPress={() => setScanning(false)}
                        variant="outline"
                        style={styles.cancelButton}
                    />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('qr.title')}</Text>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={[styles.content, { flexGrow: 1 }]}
                showsVerticalScrollIndicator={true}
                bounces={true}
            >
                {/* My QR Code */}
                <View style={styles.qrContainer}>
                    <Text style={styles.qrTitle}>{t('qr.myCode')}</Text>
                    <Text style={styles.qrSubtitle}>{t('qr.scanToAdd')}</Text>

                    <View style={styles.qrCodeWrapper}>
                        <QRCode
                            value={JSON.stringify({
                                userId: user?.id,
                                username: user?.username,
                                type: 'grit_friend_request',
                            })}
                            size={200}
                        />
                    </View>

                    <Text style={styles.username}>{user?.username}</Text>
                    <Text style={styles.userId}>ID: {user?.id}</Text>
                </View>

                {/* Divider */}
                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* Scan Button */}
                <Button
                    title={t('qr.scanCode')}
                    onPress={() => setScanning(true)}
                    icon={<Text style={{ fontSize: 20, marginRight: spacing.sm }}>📷</Text>}
                    style={styles.scanButton}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
