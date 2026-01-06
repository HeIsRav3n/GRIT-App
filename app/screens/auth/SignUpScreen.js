import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

export const SignUpScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { signUp } = useAuth();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        profilePicture: null,
        acceptedTerms: false,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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
            const imageUri = asset.base64
                ? `data:image/jpeg;base64,${asset.base64}`
                : asset.uri;
            setFormData({ ...formData, profilePicture: imageUri });
        }
    };

    const handleSignUp = async () => {
        // Validate
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email && !formData.phone) {
            newErrors.email = 'Email or phone is required';
        }
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.acceptedTerms) {
            newErrors.terms = 'You must accept the terms and conditions';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        const result = await signUp(formData);
        setLoading(false);

        if (result.success) {
            navigation.replace('ProfileSetup');
        } else {
            setErrors({ general: result.error });
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        scrollContent: {
            flexGrow: 1,
            padding: spacing.lg,
        },
        logo: {
            fontSize: 48,
            fontWeight: 'bold',
            color: theme.colors.primary,
            textAlign: 'center',
            marginTop: spacing.xl,
            marginBottom: spacing.md,
        },
        title: {
            ...textStyles.h3,
            color: theme.colors.text,
            textAlign: 'center',
            marginBottom: spacing.lg,
        },
        error: {
            ...textStyles.bodySmall,
            color: theme.colors.error,
            textAlign: 'center',
            marginBottom: spacing.md,
        },
        profilePictureContainer: {
            alignItems: 'center',
            marginBottom: spacing.lg,
        },
        profilePicture: {
            width: 100,
            height: 100,
            borderRadius: borderRadius.round,
            backgroundColor: theme.colors.backgroundSecondary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.sm,
        },
        profileImage: {
            width: 100,
            height: 100,
            borderRadius: borderRadius.round,
        },
        uploadText: {
            ...textStyles.bodySmall,
            color: theme.colors.primary,
        },
        termsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: spacing.md,
        },
        checkbox: {
            width: 20,
            height: 20,
            borderRadius: 4,
            borderWidth: 2,
            borderColor: errors.terms ? theme.colors.error : theme.colors.border,
            marginRight: spacing.sm,
            alignItems: 'center',
            justifyContent: 'center',
        },
        checkboxChecked: {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
        },
        termsText: {
            ...textStyles.bodySmall,
            color: theme.colors.textSecondary,
            flex: 1,
        },
        loginContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: spacing.lg,
            marginBottom: spacing.xl,
        },
        loginText: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
        },
        loginLink: {
            ...textStyles.body,
            color: theme.colors.primary,
            fontWeight: 'bold',
            marginLeft: spacing.xs,
        },
    });

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={true}
                bounces={true}
            >
                <Text style={styles.logo}>GRIT</Text>
                <Text style={styles.title}>{t('auth.signUp')}</Text>

                {errors.general && <Text style={styles.error}>{errors.general}</Text>}

                {/* Profile Picture Upload */}
                <View style={styles.profilePictureContainer}>
                    <TouchableOpacity onPress={pickImage}>
                        <View style={styles.profilePicture}>
                            {formData.profilePicture ? (
                                <Image source={{ uri: formData.profilePicture }} style={styles.profileImage} />
                            ) : (
                                <Text style={{ fontSize: 40 }}>📷</Text>
                            )}
                        </View>
                        <Text style={styles.uploadText}>
                            {t('auth.uploadPhoto')} ({t('auth.optional')})
                        </Text>
                    </TouchableOpacity>
                </View>

                <Input
                    label={t('auth.username')}
                    value={formData.username}
                    onChangeText={(text) => setFormData({ ...formData, username: text })}
                    placeholder="Enter username"
                    error={errors.username}
                />

                <Input
                    label={t('auth.email')}
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.email}
                />

                <Input
                    label={t('auth.phone') + ' (' + t('auth.optional') + ')'}
                    value={formData.phone}
                    onChangeText={(text) => setFormData({ ...formData, phone: text })}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                />

                <Input
                    label={t('auth.password')}
                    value={formData.password}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                    placeholder="Enter password (min 8 characters)"
                    secureTextEntry
                    error={errors.password}
                />

                <Input
                    label={t('auth.confirmPassword')}
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                    placeholder="Confirm password"
                    secureTextEntry
                    error={errors.confirmPassword}
                />

                {/* Terms and Conditions */}
                <TouchableOpacity
                    style={styles.termsContainer}
                    onPress={() => setFormData({ ...formData, acceptedTerms: !formData.acceptedTerms })}
                >
                    <View style={[styles.checkbox, formData.acceptedTerms && styles.checkboxChecked]}>
                        {formData.acceptedTerms && <Text style={{ color: '#FFF' }}>✓</Text>}
                    </View>
                    <Text style={styles.termsText}>{t('auth.acceptTerms')}</Text>
                </TouchableOpacity>
                {errors.terms && <Text style={styles.error}>{errors.terms}</Text>}

                <Button
                    title={t('auth.signUp')}
                    onPress={handleSignUp}
                    loading={loading}
                />

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>{t('auth.alreadyHaveAccount')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>{t('auth.login')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
