import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

export const Button = ({
    title,
    onPress,
    variant = 'primary', // primary, secondary, outline, ghost
    size = 'medium', // small, medium, large
    disabled = false,
    loading = false,
    icon,
    style,
    textStyle,
}) => {
    const { theme } = useTheme();

    const getButtonStyle = () => {
        const baseStyle = {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: borderRadius.md,
        };

        // Size styles
        const sizeStyles = {
            small: {
                paddingVertical: spacing.sm,
                paddingHorizontal: spacing.md,
            },
            medium: {
                paddingVertical: spacing.md,
                paddingHorizontal: spacing.lg,
            },
            large: {
                paddingVertical: spacing.lg,
                paddingHorizontal: spacing.xl,
            },
        };

        // Variant styles
        const variantStyles = {
            primary: {
                backgroundColor: theme.colors.primary,
            },
            secondary: {
                backgroundColor: theme.colors.secondary,
            },
            outline: {
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: theme.colors.primary,
            },
            ghost: {
                backgroundColor: 'transparent',
            },
        };

        if (disabled) {
            return {
                ...baseStyle,
                ...sizeStyles[size],
                backgroundColor: theme.colors.border,
            };
        }

        return {
            ...baseStyle,
            ...sizeStyles[size],
            ...variantStyles[variant],
        };
    };

    const getTextStyle = () => {
        const variantTextStyles = {
            primary: {
                color: '#FFFFFF',
            },
            secondary: {
                color: '#FFFFFF',
            },
            outline: {
                color: theme.colors.primary,
            },
            ghost: {
                color: theme.colors.primary,
            },
        };

        if (disabled) {
            return {
                ...textStyles.button,
                color: theme.colors.textTertiary,
            };
        }

        return {
            ...textStyles.button,
            ...variantTextStyles[variant],
        };
    };

    return (
        <TouchableOpacity
            style={[getButtonStyle(), style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary : '#FFFFFF'}
                />
            ) : (
                <>
                    {icon && <>{icon}</>}
                    <Text style={[getTextStyle(), textStyle]}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
};
