import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { textStyles } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const SplashScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading) {
            // Navigate after a short delay
            setTimeout(() => {
                if (isAuthenticated) {
                    navigation.replace('Main');
                } else {
                    navigation.replace('Login');
                }
            }, 2000);
        }
    }, [isLoading, isAuthenticated]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            alignItems: 'center',
            justifyContent: 'center',
        },
        logo: {
            fontSize: 72,
            fontWeight: 'bold',
            color: theme.colors.primary,
            marginBottom: spacing.xl,
        },
        tagline: {
            ...textStyles.h5,
            color: theme.colors.textSecondary,
            marginBottom: spacing.xxl,
        },
        loader: {
            marginTop: spacing.xl,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>GRIT</Text>
            <Text style={styles.tagline}>Your AI Fitness Coach</Text>
            <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
        </View>
    );
};
