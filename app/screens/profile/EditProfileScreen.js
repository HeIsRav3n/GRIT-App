import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';
import { isValidImageUri } from '../../utils/imageUtils';

export const EditProfileScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { user, updateProfile } = useAuth();
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        phone: user?.phone || '',
        profilePicture: user?.profilePicture || null,
    });
    const [loading, setLoading] = useState(false);
    const [imageError, setImageError] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            base64: true,
        });

        if (!result.canceled && result.assets && result.assets[0]) {
            const asset = result.assets[0];
            // Use base64 data URI for web persistence
            const imageUri = asset.base64
                ? `data:image/jpeg;base64,${asset.base64}`
                : asset.uri;
            setFormData({ ...formData, profilePicture: imageUri });
            setImageError(false);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Camera permission is required to take photos.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            base64: true,
        });

        if (!result.canceled && result.assets && result.assets[0]) {
            const asset = result.assets[0];
            const imageUri = asset.base64
                ? `data:image/jpeg;base64,${asset.base64}`
                : asset.uri;
            setFormData({ ...formData, profilePicture: imageUri });
            setImageError(false);
        }
    };

    const removePhoto = () => {
        Alert.alert(
            'Remove Photo',
            'Are you sure you want to remove your profile photo?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () => {
                        setFormData({ ...formData, profilePicture: null });
                        setImageError(false);
                    },
                },
            ]
        );
    };

    const showImageOptions = () => {
        Alert.alert(
            'Profile Photo',
            'Choose an option',
            [
                { text: 'Take Photo', onPress: takePhoto },
                { text: 'Choose from Gallery', onPress: pickImage },
                ...(formData.profilePicture ? [{ text: 'Remove Photo', onPress: removePhoto, style: 'destructive' }] : []),
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    const handleSave = async () => {
        if (!formData.username.trim()) {
            Alert.alert('Error', 'Username is required.');
            return;
        }

        setLoading(true);
        try {
            const result = await updateProfile({
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                profilePicture: formData.profilePicture,
            });

            if (result.success) {
                Alert.alert('Success', 'Profile updated successfully!', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            } else {
                Alert.alert('Error', 'Failed to update profile.');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while saving.');
        }
        setLoading(false);
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
            paddingBottom: 200,
            flexGrow: 1,
        },
        photoSection: {
            alignItems: 'center',
            marginBottom: spacing.xl,
        },
        photoContainer: {
            position: 'relative',
            marginBottom: spacing.lg,
        },
        profilePicture: {
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: theme.colors.backgroundSecondary,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 3,
            borderColor: theme.colors.primary,
        },
        profileImage: {
            width: 120,
            height: 120,
            borderRadius: 60,
        },
        profilePlaceholder: {
            fontSize: 48,
        },
        editBadge: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 3,
            borderColor: theme.colors.background,
        },
        editBadgeText: {
            fontSize: 16,
        },
        photoButtonsRow: {
            flexDirection: 'row',
            gap: spacing.sm,
        },
        photoButton: {
            backgroundColor: theme.colors.backgroundSecondary,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.sm,
            borderRadius: borderRadius.md,
        },
        photoButtonText: {
            ...textStyles.bodySmall,
            color: theme.colors.primary,
            fontWeight: 'bold',
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
        inputGroup: {
            marginBottom: spacing.md,
        },
        buttonContainer: {
            padding: spacing.lg,
            paddingBottom: spacing.xl,
            backgroundColor: theme.colors.background,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('profile.editProfile')}</Text>
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
                {/* Photo Section */}
                <View style={styles.photoSection}>
                    <TouchableOpacity style={styles.photoContainer} onPress={showImageOptions}>
                        <View style={styles.profilePicture}>
                            {formData.profilePicture && isValidImageUri(formData.profilePicture) && !imageError ? (
                                <Image
                                    source={{ uri: formData.profilePicture }}
                                    style={styles.profileImage}
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <Text style={styles.profilePlaceholder}>👤</Text>
                            )}
                        </View>
                        <View style={styles.editBadge}>
                            <Text style={styles.editBadgeText}>📷</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.photoButtonsRow}>
                        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                            <Text style={styles.photoButtonText}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
                            <Text style={styles.photoButtonText}>Camera</Text>
                        </TouchableOpacity>
                        {formData.profilePicture && (
                            <TouchableOpacity style={styles.photoButton} onPress={removePhoto}>
                                <Text style={[styles.photoButtonText, { color: theme.colors.error }]}>Remove</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Personal Info */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>

                    <View style={styles.inputGroup}>
                        <Input
                            label={t('auth.username')}
                            placeholder="Enter your username"
                            value={formData.username}
                            onChangeText={(text) => setFormData({ ...formData, username: text })}
                            icon="👤"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Input
                            label={t('auth.email')}
                            placeholder="Enter your email"
                            value={formData.email}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                            keyboardType="email-address"
                            icon="📧"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Input
                            label={t('auth.phone')}
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChangeText={(text) => setFormData({ ...formData, phone: text })}
                            keyboardType="phone-pad"
                            icon="📱"
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <Button
                    title={t('common.save')}
                    onPress={handleSave}
                    loading={loading}
                />
            </View>
        </SafeAreaView>
    );
};
