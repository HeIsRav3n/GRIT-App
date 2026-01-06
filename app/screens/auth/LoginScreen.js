import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { textStyles } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

export const LoginScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { login } = useAuth();
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // Validate
        const newErrors = {};
        if (!email) newErrors.email = 'Email or phone is required';
        if (!password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        const result = await login(email, password);
        setLoading(false);

        if (result.success) {
            navigation.replace('Main');
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
            justifyContent: 'center',
        },
        logo: {
            fontSize: 56,
            fontWeight: 'bold',
            color: theme.colors.primary,
            textAlign: 'center',
            marginBottom: spacing.md,
        },
        title: {
            ...textStyles.h3,
            color: theme.colors.text,
            textAlign: 'center',
            marginBottom: spacing.xl,
        },
        error: {
            ...textStyles.bodySmall,
            color: theme.colors.error,
            textAlign: 'center',
            marginBottom: spacing.md,
        },
        forgotPassword: {
            ...textStyles.bodySmall,
            color: theme.colors.primary,
            textAlign: 'right',
            marginTop: -spacing.sm,
            marginBottom: spacing.lg,
        },
        signUpContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: spacing.lg,
        },
        signUpText: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
        },
        signUpLink: {
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
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.logo}>GRIT</Text>
                <Text style={styles.title}>{t('auth.login')}</Text>

                {errors.general && <Text style={styles.error}>{errors.general}</Text>}

                <Input
                    label={t('auth.email') + ' / ' + t('auth.phone')}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter email or phone"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.email}
                />

                <Input
                    label={t('auth.password')}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    secureTextEntry
                    error={errors.password}
                />

                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>{t('auth.forgotPassword')}</Text>
                </TouchableOpacity>

                <Button
                    title={t('auth.login')}
                    onPress={handleLogin}
                    loading={loading}
                />

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>{t('auth.dontHaveAccount')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signUpLink}>{t('auth.signUp')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
