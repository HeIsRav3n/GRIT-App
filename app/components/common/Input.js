import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { textStyles, typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

export const Input = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
    error,
    icon,
    rightIcon,
    multiline = false,
    numberOfLines = 1,
    editable = true,
    style,
}) => {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const styles = StyleSheet.create({
        container: {
            marginBottom: spacing.md,
        },
        label: {
            ...textStyles.bodySmall,
            color: theme.colors.text,
            marginBottom: spacing.xs,
            fontWeight: typography.weights.medium,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.md,
            borderWidth: 1,
            borderColor: error
                ? theme.colors.error
                : isFocused
                    ? theme.colors.primary
                    : theme.colors.border,
            paddingHorizontal: spacing.md,
        },
        input: {
            flex: 1,
            ...textStyles.body,
            color: theme.colors.text,
            paddingVertical: spacing.md,
        },
        error: {
            ...textStyles.caption,
            color: theme.colors.error,
            marginTop: spacing.xs,
        },
        iconContainer: {
            marginRight: spacing.sm,
        },
        rightIconContainer: {
            marginLeft: spacing.sm,
        },
    });

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                {icon && <View style={styles.iconContainer}>{icon}</View>}
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={theme.colors.textTertiary}
                    secureTextEntry={secureTextEntry && !showPassword}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    editable={editable}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        style={styles.rightIconContainer}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Text style={{ color: theme.colors.textSecondary }}>
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </Text>
                    </TouchableOpacity>
                )}
                {rightIcon && !secureTextEntry && (
                    <View style={styles.rightIconContainer}>{rightIcon}</View>
                )}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};
